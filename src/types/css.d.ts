import 'react';

// Дозволяє передавати CSS-змінні в style без приведення типів: style={{ '--pill-index': 2 }}.
declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined;
  }
}
