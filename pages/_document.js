// to load CSS on server side before render/refresh to prevent flicker of unstyled page.
// sources ....
//https://www.styled-components.com/docs/advanced#server-side-rendering
//https://github.com/zeit/next.js/blob/master/examples/with-styled-components/pages/_document.js

import Document, { Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";
// import {animated, use}
export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    );
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    return (
      <html lang="eng">
        <Head>{this.props.styleTags}</Head>
        <body>
          <Main />
          <div id="modal" />
          <NextScript />
        </body>
      </html>
    );
  }
}
