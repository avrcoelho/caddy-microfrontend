import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import "./style.css";
import App from "./App.vue";
import Page1 from "./pages/Page1.vue";
import Page2 from "./pages/Page2.vue";
import Page3 from "./pages/Page3.vue";

const router = createRouter({
  history: createWebHistory("/app5"),
  routes: [
    { path: "/", redirect: "/page1" },
    { path: "/page1", component: Page1 },
    { path: "/page2", component: Page2 },
    { path: "/page3", component: Page3 },
  ],
});

function mount(el: HTMLElement) {
  createApp(App).use(router).mount(el);
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
