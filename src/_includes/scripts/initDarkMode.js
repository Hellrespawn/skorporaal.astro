// IIFE doesn't pollute the global namespace
(() => {
  const darkMode =
    // `??` only triggers on undefined, not on false.
    (localStorage.darkMode && localStorage.darkMode === 'true') ??
    (window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);

  darkMode && document.documentElement.classList.add('dark');
})();
