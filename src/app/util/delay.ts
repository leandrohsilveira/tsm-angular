export function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function randomDelay(min: number, max: number) {
  return delay(Math.random() * (max - min) + min)
}
