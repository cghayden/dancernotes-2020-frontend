import { ApolloProvider } from '@apollo/client'
import withData from '../utilities/withData'
import '../public/normalize.css'
import 'react-datepicker/dist/react-datepicker.css'
import GlobalStyles from '../components/GlobalStyles'
import ParentDisplayProvider from '../components/Parent/ParentDisplayProvider'
import RegistrationContextProvider from '../components/Parent/RegistrationContext'
import { FilterProvider } from '../components/Studio/FilterContext'

function MyApp({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
      <GlobalStyles>
        <ParentDisplayProvider>
          <FilterProvider>
            <RegistrationContextProvider>
              <Component {...pageProps} />
            </RegistrationContextProvider>
          </FilterProvider>
        </ParentDisplayProvider>
      </GlobalStyles>
    </ApolloProvider>
  )
}

MyApp.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {}
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }
  pageProps.query = ctx.query
  return { pageProps }
}

export default withData(MyApp)
