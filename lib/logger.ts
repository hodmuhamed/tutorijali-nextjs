import 'server-only'
import fs from 'fs'
import path from 'path'

const LOG_DIR = path.join(process.cwd(), 'logs')

function ensureLogDir() {
  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true })
  }
}

function safeStringify(value: unknown): string {
  try {
    if (value instanceof Error) {
      return JSON.stringify({
        name: value.name,
        message: value.message,
        stack: value.stack,
      })
    }

    if (value === null) {
      return JSON.stringify({
        type: 'null',
        note: 'Null value logged',
      })
    }

    if (value === undefined) {
      return JSON.stringify({
        type: 'undefined',
        note: 'Undefined value logged',
      })
    }

    return JSON.stringify(value)
  } catch {
    return JSON.stringify({
      type: 'unserializable',
      note: 'Failed to stringify meta',
    })
  }
}

function writeLog(file: string, message: string, meta?: unknown) {
  try {
    ensureLogDir()

    const metaPart =
      meta !== undefined ? ` | ${safeStringify(meta)}` : ''

    const line =
      `[${new Date().toISOString()}] ${message}${metaPart}\n`

    fs.appendFileSync(path.join(LOG_DIR, file), line)
  } catch {
    // ❗ LOGGER NIKAD NE SMIJE RUŠITI APP
  }
}

export function logInfo(message: string, meta?: unknown) {
  writeLog('info.log', message, meta)
}

export function logError(message: string, meta?: unknown) {
  writeLog('error.log', message, meta)
}
