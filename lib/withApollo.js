import withApollo from "next-with-apollo";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { endpoint, PRODendpoint } from "../config";

export default withApollo(
  ({ ctx, headers, initialState }) =>
    new ApolloClient({
      uri: process.env.NODE_ENV === "development" ? endpoint : PRODendpoint,
      cache: new InMemoryCache().restore(initialState || {}),
      credentials: "include",
      request: operation => {
        operation.setContext({
          fetchOptions: {
            credentials: "include"
          },
          headers: { cookie: headers && headers.cookie }
        });
      }
    })
);
