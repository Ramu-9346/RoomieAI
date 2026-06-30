/**
 * App logger — wraps console with levels and environment gating.
 * In production: only warn/error are emitted.
 * Never log PII (phone numbers, payment amounts, order contents).
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const IS_DEV = process.env.EXPO_PUBLIC_APP_ENV === 'development';

function log(level: LogLevel, tag: string, message: string, data?: unknown): void {
  if (!IS_DEV && (level === 'debug' || level === 'info')) return;

  const prefix = `[RoomieAI:${tag}]`;

  switch (level) {
    case 'debug': console.info(`${prefix} ${message}`, data ?? '');  break;
    case 'info':  console.info(`${prefix} ${message}`, data ?? '');  break;
    case 'warn':  console.warn(`${prefix} ${message}`, data ?? '');  break;
    case 'error': console.error(`${prefix} ${message}`, data ?? ''); break;
  }
}

export const Logger = {
  debug: (tag: string, message: string, data?: unknown) => log('debug', tag, message, data),
  info:  (tag: string, message: string, data?: unknown) => log('info',  tag, message, data),
  warn:  (tag: string, message: string, data?: unknown) => log('warn',  tag, message, data),
  error: (tag: string, message: string, data?: unknown) => log('error', tag, message, data),

  /** Log API call without exposing response body */
  api: (method: string, path: string, status: number) => {
    log('debug', 'API', `${method} ${path} → ${status}`);
  },

  /** Log AI agent step */
  agent: (agentName: string, step: string) => {
    log('info', `Agent:${agentName}`, step);
  },
};
