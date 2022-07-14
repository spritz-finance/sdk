export function invert<T extends string | number, K extends number | string>(obj: Record<T, K>): Record<K, T> {
  const ret = {} as Record<K, T>
  Object.keys(obj).forEach((key) => {
    // @ts-ignore
    ret[obj[key]] = key
  })
  return ret
}
