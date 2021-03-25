export const entries = (obj) => {
  return Object.keys(obj).map((key: string) =>
    [key, obj[key]]
  )
}
