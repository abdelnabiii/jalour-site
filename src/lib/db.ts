import mysql from "mysql2/promise";

let pool: mysql.Pool | null = null;
let schemaReady: Promise<void> | null = null;

function getPool() {
  if (pool) return pool;

  const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS } = process.env;
  if (!DB_HOST || !DB_NAME || !DB_USER || !DB_PASS) {
    throw new Error(
      "Database is not configured. Set DB_HOST, DB_NAME, DB_USER, DB_PASS."
    );
  }

  pool = mysql.createPool({
    host: DB_HOST,
    port: DB_PORT ? Number(DB_PORT) : 3306,
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASS,
    waitForConnections: true,
    connectionLimit: 5,
  });

  return pool;
}

async function ensureSchema() {
  await getPool().query(`
    CREATE TABLE IF NOT EXISTS investor_applications (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      phone VARCHAR(64) NOT NULL,
      email VARCHAR(255) NOT NULL,
      address VARCHAR(255),
      occupation VARCHAR(255) NOT NULL,
      education VARCHAR(255) NOT NULL,
      social_links VARCHAR(500),
      budget VARCHAR(100) NOT NULL,
      liquidity VARCHAR(100) NOT NULL,
      other_projects VARCHAR(500),
      objective VARCHAR(255) NOT NULL,
      club_memberships VARCHAR(255),
      spouse_name VARCHAR(255),
      spouse_occupation VARCHAR(255),
      status ENUM('pending', 'approved', 'declined') NOT NULL DEFAULT 'pending',
      password_hash VARCHAR(255),
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      decided_at TIMESTAMP NULL
    )
  `);
}

export async function db() {
  if (!schemaReady) schemaReady = ensureSchema();
  await schemaReady;
  return getPool();
}
