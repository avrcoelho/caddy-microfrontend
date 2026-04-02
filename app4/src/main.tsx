import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

function mount(el: HTMLElement) {
  createRoot(el).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

// shell.js (a regular <script>) runs synchronously before this deferred module
// and its React render flushes synchronously, temporarily detaching
// #application-content. Wait for the layout's useEffect to re-attach it.
function waitAndMount() {
  const el = document.getElementById("application-content");
  if (el && el.isConnected) {
    mount(el);
    return;
  }
  const observer = new MutationObserver(() => {
    const target = document.getElementById("application-content");
    if (target && target.isConnected) {
      observer.disconnect();
      mount(target);
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

waitAndMount();
