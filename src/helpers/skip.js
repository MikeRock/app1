export default (fn, until = 0) => {
  let count = 0;
  return (...args) => {
    if (count >= until) fn.apply(this, args);
    count++;
  };
};
