import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html>
      <Head>
        <style dangerouslySetInnerHTML={{ __html: `
          body { margin: 0; }
          #application-content { display: none; }
        `}} />
      </Head>
      <body>
        <div id="application-layout" />
        <Main />
        <Script
          id="app-layout-config"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.__APP_LAYOUT = {
                getLayoutTarget: function() {
                  return document.getElementById('application-layout');
                },
                getContentTarget: function() {
                  return document.getElementById('application-content');
                },
              };
            `,
          }}
        />
        <Script src="/layout/shell.js" type="module" strategy="afterInteractive" />
        <NextScript />
      </body>
    </Html>
  );
}
