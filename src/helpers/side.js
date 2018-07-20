export default (fn, fn2) => {
  let partial = { count: 0 };
  return (...args) => {
    fn2.call(this, partial, ...args);
    fn.apply(this, args);
  };
};
