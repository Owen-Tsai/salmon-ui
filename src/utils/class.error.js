class SalmonUIError extends Error{
  constructor(msg) {
    super(msg)
    this.name = 'SalmonUIError'
  }
}

export default (scope, msg) => {
  throw new SalmonUIError(`[${scope}] ${msg}`)
}

export const warn = (scope, msg) => {
  console.warn(new SalmonUIError(`[${scope}] ${msg}`))
}
