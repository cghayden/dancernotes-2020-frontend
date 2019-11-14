import Head from "next/head";

const Meta = () => (
  <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charSet="utf-8" />
    <link rel="shortcut icon" href="/static/dnIcon.png" />
    <link rel="stylesheet" href="https://use.typekit.net/gkh6amt.css" />
    <link
      href="https://fonts.googleapis.com/css?family=Montserrat|Open+Sans+Dancing+Script"
      rel="stylesheet"
    />
    <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
    {/* in progress is red loading abr across top of page */}
    <title>DancerNotes</title>
  </Head>
);

export default Meta;
