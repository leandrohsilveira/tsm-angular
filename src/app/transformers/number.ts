/**
 * Returns a function that takes a string and returns it unless it is null or undefined
 * or an empty string, in which case it returns the provided defaultValue.
 *
 * @param defaultValue the value to return if the input is null, undefined, or empty string
 * @returns a function that takes a string and returns a number
 */
export function numberTransformer(defaultValue = 0) {
  return (value: string | null | undefined) => {
    if (value === '' || value === null || value === undefined) {
      return defaultValue
    }
    return Number(value)
  }
}
