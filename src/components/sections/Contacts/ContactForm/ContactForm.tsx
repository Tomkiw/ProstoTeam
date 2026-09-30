'use client';

import { type FormEvent, useId, useState, useTransition } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/cn';
import {
  HONEYPOT_FIELD,
  LEAD_LIMITS,
  LOCALE_FIELD,
  OTHER_SERVICE,
  getMissingFields,
  readLead,
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
};

type SubmitStatus = 'idle' | 'success' | 'error';

type TextFieldProps = {
  id: string;
  name: RequiredLeadField;
  label: string;
  placeholder: string;
  autoComplete: string;
  errorMessage?: string;
  onInput: () => void;
};

function TextField({
  id,
  name,
  label,
  placeholder,
  autoComplete,
  errorMessage,
  onInput,
}: TextFieldProps) {
  const errorId = `${id}-error`;

  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        id={id}
        name={name}
        type="text"
        required
        maxLength={LEAD_LIMITS[name]}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={errorMessage ? true : undefined}
        aria-describedby={errorMessage ? errorId : undefined}
        className={cn(styles.control, styles.input)}
        onInput={onInput}
      />
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
export function ContactForm({ serviceOptions }: ContactFormProps) {
  const t = useTranslations('contactForm');
  const locale = useLocale();
  const id = useId();
  const [missingFields, setMissingFields] = useState<RequiredLeadField[]>([]);
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [isPending, startTransition] = useTransition();

  const titleId = `${id}-title`;
  const serviceId = `${id}-service`;
  const messageId = `${id}-message`;

  function clearFieldError(field: RequiredLeadField) {
    setMissingFields((fields) => fields.filter((missingField) => missingField !== field));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isPending) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const missing = getMissingFields(readLead(formData));

    setMissingFields(missing);
    setStatus('idle');

    if (missing.length > 0) {
      focusField(form, missing[0]);
      return;
    }

    startTransition(async () => {
      try {
        const result = await sendLead(formData);

        if (result.status === 'invalid') {
          setMissingFields(result.missingFields);
          return;
        }

        setStatus(result.status);

        if (result.status === 'success') {
          form.reset();
        }
      } catch {
        // Сервер недоступний або зник інтернет — заявка точно не дійшла
        setStatus('error');
      }
    });
  }

  return (
    <form className={styles.card} aria-labelledby={titleId} noValidate onSubmit={handleSubmit}>
      <h3 id={titleId} className={styles.title}>
        {t('title')}
      </h3>
      <input type="hidden" name={LOCALE_FIELD} value={locale} />

      <div className={styles.row}>
        <TextField
          id={`${id}-name`}
          name="name"
          label={t('nameLabel')}
          placeholder={t('namePlaceholder')}
          autoComplete="name"
          errorMessage={missingFields.includes('name') ? t('errors.name') : undefined}
          onInput={() => clearFieldError('name')}
        />
        <TextField
          id={`${id}-contact`}
          name="contact"
          label={t('contactLabel')}
          placeholder={t('contactPlaceholder')}
          autoComplete="tel"
          errorMessage={missingFields.includes('contact') ? t('errors.contact') : undefined}
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
          <svg
            className={styles.chevron}
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
        <Button type="submit" size="lg" disabled={isPending} className={styles.submit}>
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

      {status === 'success' && (
        <p role="status" className={styles.success}>
          {t('success')}
        </p>
      )}
      {status === 'error' && (
        <p role="alert" className={styles.error}>
          {t('error')}
        </p>
      )}
    </form>
  );
}
