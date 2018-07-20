export default (func, wait, immediate) => {
  let timeout;
  return (...args) => {
    let later = () => {
      timeout = null;
      if (!immediate) func.apply(this, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(this, args);
  };
};
