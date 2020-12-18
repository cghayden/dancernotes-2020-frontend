import Head from 'next/head'

const Meta = () => (
  <Head>
    <meta name='viewport' content='width=device-width, initial-scale=1' />
    <meta charSet='utf-8' />
    <link rel='shortcut icon' href='/dnIcon.png' />
    <link rel='apple-touch-icon' href='/dnIcon.png' />
    <link rel='stylesheet' href='https://use.typekit.net/gkh6amt.css' />

    {/* <link rel="preconnect" href="https://fonts.gstatic.com"/>
<link href="https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,200;0,300;0,400;0,500;0,600;1,200;1,300;1,400;1,500&display=swap" rel="stylesheet"/> */}
    <link
      href='https://fonts.googleapis.com/css?family=Open+Sans|Dancing+Script|Montserrat|Source+Sans+Pro:400,600|Roboto:ital,wght@0,400;0,500;0,700;1,400;1,500&display=swap'
      rel='stylesheet'
    />
    <link rel='stylesheet' type='text/css' href='/nprogress.css' />
    <title>DancerNotes</title>
  </Head>
)

export default Meta
