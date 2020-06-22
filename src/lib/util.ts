export function debuglog(namespace: string): (...args: any[]) => void {
  if (import.meta.env.NODE_ENV === 'development') {
    return (...args: any[]) => console.log(`[${namespace}]`, ...args)
  }
  return () => void 0
}
