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

// No longer used .. replaced with init-apollo + with-apollo-client
// import withApollo from "next-with-apollo";
// import ApolloClient from "apollo-boost";
// import { InMemoryCache } from "apollo-cache-inmemory";

// import { endpoint } from "../config";

// function createClient({ ctx, headers, initialState }) {
//   return new ApolloClient({
//     uri: process.env.NODE_ENV === "development" ? endpoint : endpoint,
//     cache: new InMemoryCache().restore(initialState || {}),
//     ssrMode: true,
//     connectToDevTools: true,
//     request: operation => {
//       operation.setContext({
//         fetchOptions: {
//           credentials: "include",
//         },
//         headers,
//       });
//     },
//   });
// }

// export default withApollo(createClient);
