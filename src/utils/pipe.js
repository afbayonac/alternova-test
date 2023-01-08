export const pipe = (...args) => args.reduce((acc, fn) => fn(acc), null)
