(() => {
  const references = [...document.querySelectorAll('details.reference')];
  let printState;

  window.addEventListener('beforeprint', () => {
    if (printState) return;
    printState = references.map(reference => reference.open);
    for (const reference of references) reference.open = true;
  });

  window.addEventListener('afterprint', () => {
    if (!printState) return;
    references.forEach((reference, index) => { reference.open = printState[index]; });
    printState = undefined;
  });

  const links = [...document.querySelectorAll('.index a[href^="#"]')];
  function markLocation() {
    for (const link of links) {
      if (link.hash === window.location.hash) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    }
  }
  window.addEventListener('hashchange', markLocation);
  markLocation();
})();
