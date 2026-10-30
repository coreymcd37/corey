/* Brothers Brands: name icon-only buttons and keep layer rows from nesting controls inside a button role. */
(function () {
  function fix() {
    document.querySelectorAll('button').forEach(function (b) {
      if ((b.innerText || '').trim() || b.getAttribute('aria-label') || b.getAttribute('aria-labelledby')) return;
      var hidden = b.textContent.trim();
      if (hidden) { b.setAttribute('aria-label', hidden); return; }
      var svg = b.querySelector('svg[class*="lucide-"]');
      var n = b.title || (svg ? svg.getAttribute('class').match(/lucide-([a-z0-9-]+)/g).pop().replace('lucide-', '').replace(/-\d+$/, '').replace(/-/g, ' ') : 'Button');
      b.setAttribute('aria-label', n);
    });
    document.querySelectorAll('[role=button]').forEach(function (el) {
      if (!el.querySelector('button, a[href], input, select, textarea, [tabindex]')) return;
      el.setAttribute('role', 'group');
      el.removeAttribute('aria-pressed');
      if (!el.getAttribute('aria-label')) el.setAttribute('aria-label', el.textContent.replace(/\s+/g, ' ').trim().slice(0, 60));
    });
  }
  function run() { fix(); new MutationObserver(fix).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['role'] }); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run); else run();
})();
