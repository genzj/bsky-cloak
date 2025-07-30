import STYLES from './scss/style.scss';

// GM_addStyle cannot be used because adding it to @grant delays script loading,
// making the patching of window.fetch ineffective.
function addStyle(content: string): HTMLStyleElement {
  const style = document.createElement('style');
  style.textContent = content;
  document.head.appendChild(style);
  return style;
}

export function addOverridingStyles() {
  setTimeout(() => {
    addStyle(STYLES);
  }, 0);
}
