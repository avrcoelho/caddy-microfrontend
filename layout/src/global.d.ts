interface AppLayoutConfig {
  getLayoutTarget: () => HTMLElement | null;
  getContentTarget: () => HTMLElement | null;
}

declare global {
  interface Window {
    __APP_LAYOUT?: AppLayoutConfig;
  }
}

export {};
