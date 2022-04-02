export type PartialReturnType<T extends (...args: any) => any> = Partial<ReturnType<T>>

export type Writeable<T> = { -readonly [P in keyof T]: T[P] }