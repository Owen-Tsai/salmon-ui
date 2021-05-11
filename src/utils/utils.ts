export const entries = (obj) => {
  return Object.keys(obj).map((key: string) =>
    [key, obj[key]]
  )
}

export const processSizeType = (
  propVal: string | number
): string => {
  return typeof propVal === 'string' ? propVal : `${propVal}px`
}
