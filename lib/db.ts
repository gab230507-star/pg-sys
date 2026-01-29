import { neon, type NeonQueryFunction } from "@neondatabase/serverless"

function getConnectionString() {
  return (
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.POSTGRES_URL_NON_POOLING ||
    process.env.DATABASE_URL_UNPOOLED
  )
}

function createSqlClient(): NeonQueryFunction<false, false> {
  const connectionString = getConnectionString()
  if (!connectionString) {
    throw new Error("No database connection string found in env vars")
  }
  return neon(connectionString)
}

let _sql: NeonQueryFunction<false, false> | null = null

export function getSql(): NeonQueryFunction<false, false> {
  if (!_sql) {
    _sql = createSqlClient()
  }
  return _sql
}

// For backward compatibility - lazy initialization
export const sql = new Proxy({} as NeonQueryFunction<false, false>, {
  apply(_target, _thisArg, args) {
    return getSql()(...args)
  },
  get(_target, prop) {
    return (getSql() as unknown as Record<string | symbol, unknown>)[prop]
  },
})
