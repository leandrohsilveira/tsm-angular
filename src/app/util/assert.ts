export function assert(
  value: unknown,
  message?: string | Error
): asserts value {
  if (!value) throwError(message)
}

function throwError(error?: string | Error): never {
  if (error instanceof Error) throw error
  throw new Error(error ?? 'Assertion failed')
}
