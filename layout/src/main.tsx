import { createRoot } from 'react-dom/client';
import { Layout } from './Layout';

function init() {
  const config = window.__APP_LAYOUT;
  if (!config) {
    console.warn('[app-layout] window.__APP_LAYOUT not found');
    return;
  }

  const target = config.getLayoutTarget();
  if (!target) {
    console.warn('[app-layout] layout target element not found');
    return;
  }

  // Move the content element inside the layout target so the shell
  // controls the full page structure: topbar → content → footer.
  const content = config.getContentTarget();
  if (content) {
    target.appendChild(content);
  }

  createRoot(target).render(<Layout contentElement={content} />);

  // Show content only after layout is mounted
  if (content) {
    content.style.display = 'block';
  }
}

init();
