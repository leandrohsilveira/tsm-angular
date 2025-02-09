export function formatText(text: string, params: Record<string, unknown>) {
  return text.replace(/{(\w+?)}/g, (match, key) => {
    const value = params[key]
    return value ? String(value) : ''
  })
}
