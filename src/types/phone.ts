/** Варіант у списку країн біля поля телефону. Готується на сервері (lib/phone.ts) і йде у форму пропсом. */
export type PhoneCountryOption = {
  /** ISO-код країни (PL, UA…) або OTHER_PHONE_COUNTRY — «Інша країна». */
  code: string;
  /** Рядок у списку: «Польща +48». */
  label: string;
  /** Що видно в полі, коли варіант вибрано: «PL +48». */
  shortLabel: string;
};
