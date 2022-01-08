class SalmonUIError extends Error {
  constructor(msg: string) {
    super(msg)
    this.name = 'SalmonUIError'
  }
}

export default (scope: string, msg: string) => {
  throw new SalmonUIError(`[${scope}] ${msg}`)
}

export const warn = (scope: string, msg: string) => {
  console.warn(new SalmonUIError(`[${scope}] ${msg}`))
}
