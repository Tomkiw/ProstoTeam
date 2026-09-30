const TELEGRAM_API_URL = 'https://api.telegram.org';
const REQUEST_TIMEOUT_MS = 10_000;

/**
 * Надсилає текст у чат заявок від імені бота. Повертає false, якщо не вийшло.
 * Токен і chat_id — лише з env: без префікса NEXT_PUBLIC_ вони не потрапляють у браузер.
 */
export async function sendTelegramMessage(text: string): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error('Telegram: не задано TELEGRAM_BOT_TOKEN або TELEGRAM_CHAT_ID');
    return false;
  }

  try {
    const response = await fetch(`${TELEGRAM_API_URL}/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text }),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });

    if (!response.ok) {
      console.error(`Telegram: відповідь ${response.status}`);
    }

    return response.ok;
  } catch (error) {
    // Лише назва помилки: у повному тексті може опинитися адреса запиту разом із токеном
    console.error(
      'Telegram: запит не вдався,',
      error instanceof Error ? error.name : 'невідома помилка',
    );
    return false;
  }
}
