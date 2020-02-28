import React from "react";
import App from "next/app";
// import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloProvider } from "react-apollo";
import withApollo from "../lib/withApollo";

import "../public/normalize.css";
import "react-datepicker/dist/react-datepicker.css";
import GlobalStyles from "../components/GlobalStyles";

import ParentDisplayProvider from "../components/Parent/ParentDisplayProvider";
import RegistrationContextProvider from "../components/Parent/RegistrationContext";
class MyApp extends App {
  render() {
    const { Component, pageProps, apollo } = this.props;
    return (
      <ApolloProvider client={apollo}>
        <GlobalStyles>
          <ParentDisplayProvider>
            <RegistrationContextProvider>
              <Component {...pageProps} />
            </RegistrationContextProvider>
          </ParentDisplayProvider>
        </GlobalStyles>
      </ApolloProvider>
    );
  }
}

export default withApollo(MyApp);
