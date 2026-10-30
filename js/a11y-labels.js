/* Gives unlabeled form controls an accessible name from nearby visible text. */
(function () {
  function nameFor(el) {
    var row = el.closest('label, li, tr, .item, .row, div') || el.parentElement;
    var t = row ? (row.textContent || '').replace(/\s+/g, ' ').trim() : '';
    if (!t && el.tagName === 'SELECT' && el.options.length) t = el.options[0].text;
    return (t || el.id || el.type || 'Field').slice(0, 80);
  }
  function fix(root) {
    (root.querySelectorAll ? root : document).querySelectorAll('input:not([type=hidden]), select, textarea').forEach(function (el) {
      if (el.hasAttribute('aria-label') || el.hasAttribute('aria-labelledby') || el.closest('label')) return;
      if (el.id && document.querySelector('label[for="' + CSS.escape(el.id) + '"]')) return;
      el.setAttribute('aria-label', el.tagName === 'SELECT' && el.options.length ? el.options[el.selectedIndex >= 0 ? el.selectedIndex : 0].text.split(':')[0] : nameFor(el));
    });
  }
  function run() { fix(document); new MutationObserver(function () { fix(document); }).observe(document.body, { childList: true, subtree: true }); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run); else run();
})();
