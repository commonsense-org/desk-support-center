// This JS is needed because the desk-support-center needs to have the
// `window.CommonKit.Util` library sooner than other libraries.
// This is because desk-support-center library is trated differently, it is not
// aggregated, it is async and with a lower weight. This helps with perf
// but make harder to get the regular `utility` component library in time
// without bigger changes and then some times there is a JS where it is not
// loaded in time.
// This duplicated but smaller `utility` library will only be loaded by
// desk-support-center with a lower weight to ensure it will be ready in time.

function debounce(func, timeout = 300){
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}
window.CommonKit = window.CommonKit || {};
// Only set `window.CommonKit.Util` if it is not set yet.
window.CommonKit.Util = window.CommonKit.Util || {};
window.CommonKit.Util.debounce = debounce;

