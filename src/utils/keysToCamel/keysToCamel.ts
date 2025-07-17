function keysToCamel(obj: unknown): unknown {
  if (obj === null || obj === undefined) {
    return obj
  }

  // Handle Array
  if (Array.isArray(obj)) {
    return obj.map(item => keysToCamel(item))
  }

  // Handle Record
  if (isPlainObject(obj)) {
    const result: Record<string, unknown> = {}

    for (const [key, value] of Object.entries(obj)) {
      result[toCamel(key)] = keysToCamel(value)
    }

    return result
  }

  // Return unchanged all other types
  return obj
}

export function toCamel (s: string): string {
  return s.replace(/([-_][a-z0-9])/gi, ($1) => {
    return $1.toUpperCase().replace('-', '').replace('_', '')
  })
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return (
    value !== null &&
    typeof value === 'object' &&
    value.constructor === Object &&
    Object.getPrototypeOf(value) === Object.prototype
  )
}

export default keysToCamel
