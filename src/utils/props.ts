// Generate props of a component along with types and validations
export const generateValidator = <T>(prop: T): (() => boolean) => {

  return () => true
}
