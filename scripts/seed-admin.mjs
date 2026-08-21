import { mkdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { scrypt, randomBytes } from 'node:crypto'
import { promisify } from 'node:util'
import { DatabaseSync } from 'node:sqlite'

const scryptAsync = promisify(scrypt)

const dbPath = resolve('data/app.sqlite')
const username = 'admin'
const password = 'admin123'

async function hashPassword(value) {
  const salt = randomBytes(16).toString('base64url')
  const key = await scryptAsync(value, salt, 64)

  return `scrypt$${salt}$${Buffer.from(key).toString('base64url')}`
}

await mkdir(dirname(dbPath), { recursive: true })

const db = new DatabaseSync(dbPath)

try {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `)

  const passwordHash = await hashPassword(password)

  db.prepare(`
    INSERT INTO users (username, password_hash)
    VALUES (?, ?)
    ON CONFLICT(username) DO UPDATE SET
      password_hash = excluded.password_hash,
      updated_at = CURRENT_TIMESTAMP
  `).run(username, passwordHash)

  const user = db.prepare('SELECT id, username, created_at, updated_at FROM users WHERE username = ?').get(username)

  console.log(`Seeded local admin user "${user.username}" in ${dbPath}`)
  console.log(`User id: ${user.id}`)
} finally {
  db.close()
}
