import React from 'react'
import App from 'next/app'
// import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloProvider } from 'react-apollo'
import withApollo from '../utilities/withApollo'

import '../public/normalize.css'
import 'react-datepicker/dist/react-datepicker.css'
import GlobalStyles from '../components/GlobalStyles'

import ParentDisplayProvider from '../components/Parent/ParentDisplayProvider'
import RegistrationContextProvider from '../components/Parent/RegistrationContext'
import { FilterProvider } from '../components/Studio/FilterContext'

class MyApp extends App {
  render() {
    const { Component, pageProps, apollo } = this.props
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
}

export default withApollo(MyApp)
