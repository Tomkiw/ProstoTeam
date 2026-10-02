'use client';

import {
  type ReactNode,
  type SubmitEvent,
  useEffect,
  useId,
  useRef,
  useState,
  useTransition,
} from 'react';
import { flushSync } from 'react-dom';
import { useLocale, useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { CONTACTS } from '@/data/contacts';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/cn';
import { OTHER_PHONE_COUNTRY } from '@/lib/constants';
import type { PhoneCountryOption } from '@/types/phone';
import {
  HONEYPOT_FIELD,
  LEAD_LIMITS,
  LOCALE_FIELD,
  OTHER_SERVICE,
  PHONE_COUNTRY_FIELD,
  getFirstInvalidField,
  getLeadErrors,
  readLead,
  type LeadErrors,
  type RequiredLeadField,
} from './lead';
import { sendLead } from './sendLead';
import styles from './ContactForm.module.css';

type ServiceOption = {
  value: string;
  label: string;
};

type ContactFormProps = {
  /** Послуги поточною мовою: готуються на сервері, щоб не везти в браузер усі переклади. */
  serviceOptions: ServiceOption[];
  /** Країни для телефону — теж із сервера: бібліотека з даними номерів у браузер не потрапляє. */
  phoneCountries: PhoneCountryOption[];
  defaultPhoneCountry: string;
};

type SubmitStatus = 'idle' | 'success' | 'error';

// Текст під полем телефону залежно від помилки
const CONTACT_ERROR_KEYS = {
  required: 'errors.contact',
  invalid: 'errors.phoneInvalid',
} as const;

// Запасний канал у повідомленні про помилку, якщо заявка не пішла
const TELEGRAM_CONTACT = CONTACTS.find((contact) => contact.channel === 'telegram');

type ChevronProps = {
  className: string;
};

function Chevron({ className }: ChevronProps) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 8l5 5 5-5" />
    </svg>
  );
}

type PhoneCountrySelectProps = {
  label: string;
  options: PhoneCountryOption[];
  value: string;
  onChange: (code: string) => void;
};

/**
 * Код країни біля номера. Видно коротко «PL +48», а прозорий нативний select лежить зверху:
 * повний список із назвами, клавіатура й скрінрідери працюють як у звичайного select.
 */
function PhoneCountrySelect({ label, options, value, onChange }: PhoneCountrySelectProps) {
  const selected = options.find((option) => option.code === value);

  return (
    <div className={styles.country}>
      {selected && <span aria-hidden="true">{selected.shortLabel}</span>}
      <select
        name={PHONE_COUNTRY_FIELD}
        value={value}
        aria-label={label}
        className={styles.countrySelect}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option.code} value={option.code}>
            {option.label}
          </option>
        ))}
      </select>
      <Chevron className={styles.countryChevron} />
    </div>
  );
}

type TextFieldProps = {
  id: string;
  name: RequiredLeadField;
  /** tel — на телефоні відкривається цифрова клавіатура. */
  type: 'text' | 'tel';
  label: string;
  placeholder: string;
  autoComplete: string;
  errorMessage?: string;
  /** Те, що стоїть у рядку перед полем, — напр. код країни. */
  prefix?: ReactNode;
  onInput: () => void;
};

function TextField({
  id,
  name,
  type,
  label,
  placeholder,
  autoComplete,
  errorMessage,
  prefix,
  onInput,
}: TextFieldProps) {
  const errorId = `${id}-error`;
  const input = (
    <input
      id={id}
      name={name}
      type={type}
      required
      maxLength={LEAD_LIMITS[name]}
      autoComplete={autoComplete}
      placeholder={placeholder}
      aria-invalid={errorMessage ? true : undefined}
      aria-describedby={errorMessage ? errorId : undefined}
      className={cn(styles.control, styles.input)}
      onInput={onInput}
    />
  );

  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {/* Зірочку бачать очима, а скрінрідеру про обов'язковість каже атрибут required */}
        <span aria-hidden="true"> *</span>
      </label>
      {prefix ? (
        <div className={styles.inputRow}>
          {prefix}
          {input}
        </div>
      ) : (
        input
      )}
      {errorMessage && (
        <p id={errorId} className={styles.fieldError}>
          {errorMessage}
        </p>
      )}
    </div>
  );
}

function focusField(form: HTMLFormElement, field: RequiredLeadField) {
  const element = form.elements.namedItem(field);

  if (element instanceof HTMLElement) {
    element.focus();
  }
}

/** Форма заявки: перевіряє обов'язкові поля в браузері й надсилає заявку через Server Action. */
export function ContactForm({
  serviceOptions,
  phoneCountries,
  defaultPhoneCountry,
}: ContactFormProps) {
  const t = useTranslations('contactForm');
  const tContacts = useTranslations('contacts');
  const locale = useLocale();
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<LeadErrors>({});
  const [phoneCountry, setPhoneCountry] = useState(defaultPhoneCountry);
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [isPending, startTransition] = useTransition();

  const titleId = `${id}-title`;
  const serviceId = `${id}-service`;
  const messageId = `${id}-message`;

  // Після успіху фокус — на подяку: скрінрідер її прочитає, а клавіатура не загубиться
  useEffect(() => {
    if (status === 'success') {
      successRef.current?.focus();
    }
  }, [status]);

  function clearFieldError(field: RequiredLeadField) {
    setErrors((currentErrors) => ({ ...currentErrors, [field]: undefined }));
  }

  /** Показує помилки й переводить фокус на перше поле з помилкою. true — якщо помилки є. */
  function applyFieldErrors(form: HTMLFormElement, fieldErrors: LeadErrors): boolean {
    setErrors(fieldErrors);
    const firstInvalidField = getFirstInvalidField(fieldErrors);

    if (firstInvalidField) {
      focusField(form, firstInvalidField);
    }

    return Boolean(firstInvalidField);
  }

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isPending) return;

    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus('idle');

    if (applyFieldErrors(form, getLeadErrors(readLead(formData)))) {
      return;
    }

    startTransition(async () => {
      try {
        const result = await sendLead(formData);

        if (result.status === 'invalid') {
          applyFieldErrors(form, result.errors);
          return;
        }

        setStatus(result.status);

        // Поля зникають разом із формою, тож скидаємо лише вибрану країну
        if (result.status === 'success') {
          setPhoneCountry(defaultPhoneCountry);
        }
      } catch {
        // Сервер недоступний або зник інтернет — заявка точно не дійшла
        setStatus('error');
      }
    });
  }

  function handleSendAnother() {
    // Синхронний рендер: форма має з'явитися до того, як переводимо на неї фокус
    flushSync(() => setStatus('idle'));

    if (formRef.current) {
      focusField(formRef.current, 'name');
    }
  }

  if (status === 'success') {
    return (
      <div ref={successRef} tabIndex={-1} className={cn(styles.card, styles.successCard)}>
        <h3 className={styles.title}>{t('successTitle')}</h3>
        <p className={styles.successText}>{tContacts('responseTime')}</p>
        <div>
          <Button variant="outline" size="lg" onClick={handleSendAnother}>
            {t('sendAnother')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      // POST: якщо натиснути до завантаження JS, дані не опиняться в адресі сторінки
      method="post"
      className={styles.card}
      aria-labelledby={titleId}
      noValidate
      onSubmit={handleSubmit}
    >
      <h3 id={titleId} className={styles.title}>
        {t('title')}
      </h3>
      {/* Пояснення до зірочок; скрінрідеру воно не потрібне — у полів є required */}
      <p className={styles.requiredNote} aria-hidden="true">
        {t('requiredNote')}
      </p>
      <input type="hidden" name={LOCALE_FIELD} value={locale} />

      <div className={styles.row}>
        <TextField
          id={`${id}-name`}
          name="name"
          type="text"
          label={t('nameLabel')}
          placeholder={t('namePlaceholder')}
          autoComplete="name"
          errorMessage={errors.name && t('errors.name')}
          onInput={() => clearFieldError('name')}
        />
        <TextField
          id={`${id}-contact`}
          name="contact"
          type="tel"
          label={t('contactLabel')}
          placeholder={
            phoneCountry === OTHER_PHONE_COUNTRY
              ? t('otherCountryPlaceholder')
              : t('contactPlaceholder')
          }
          autoComplete="tel-national"
          errorMessage={errors.contact && t(CONTACT_ERROR_KEYS[errors.contact])}
          prefix={
            <PhoneCountrySelect
              label={t('phoneCountryLabel')}
              options={phoneCountries}
              value={phoneCountry}
              onChange={setPhoneCountry}
            />
          }
          onInput={() => clearFieldError('contact')}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor={serviceId} className={styles.label}>
          {t('serviceLabel')}
        </label>
        <div className={styles.selectWrapper}>
          <select
            id={serviceId}
            name="service"
            defaultValue=""
            className={cn(styles.control, styles.select)}
          >
            <option value="">{t('servicePlaceholder')}</option>
            {serviceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
            <option value={OTHER_SERVICE}>{t('otherService')}</option>
          </select>
          <Chevron className={styles.chevron} />
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor={messageId} className={styles.label}>
          {t('messageLabel')}
        </label>
        <textarea
          id={messageId}
          name="message"
          rows={4}
          maxLength={LEAD_LIMITS.message}
          placeholder={t('messagePlaceholder')}
          className={cn(styles.control, styles.textarea)}
        />
      </div>

      {/* Пастка для ботів: людина поля не бачить і не потрапить у нього з клавіатури */}
      <div className="visually-hidden" aria-hidden="true">
        <input name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className={styles.actions}>
        <Button type="submit" size="lg" aria-disabled={isPending} className={styles.submit}>
          {isPending ? t('sending') : t('submit')}
        </Button>
        <p className={styles.consent}>
          {t.rich('consent', {
            link: (chunks) => (
              <Link href="/privacy" className={styles.consentLink}>
                {chunks}
              </Link>
            ),
          })}
        </p>
      </div>

      {status === 'error' && (
        <p role="alert" className={styles.error}>
          {t.rich('error', {
            link: (chunks) =>
              TELEGRAM_CONTACT ? (
                <a href={TELEGRAM_CONTACT.href} target="_blank" rel="noopener noreferrer">
                  {chunks}
                </a>
              ) : (
                chunks
              ),
          })}
        </p>
      )}
    </form>
  );
}
