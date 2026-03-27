export const omit = <T extends object, K extends keyof T>(
  obj: T,
  fields: K[]
): Omit<T, K> => {
  const result = { ...obj }

  fields.forEach((field) => {
    if (field in result) {
      delete result[field]
    }
  })

  return result as Omit<T, K>
}
