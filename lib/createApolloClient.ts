import { ApolloClient, createHttpLink } from "@apollo/client/core/index.js";
import { InMemoryCache } from "@apollo/client/cache/index.js";
import { setContext } from "@apollo/client/link/context/index.js";

// to pull in environmental variables (might try a different approach later)
import * as dotenv from "dotenv";
dotenv.config();

export function createApolloClient(authToken = "") {
  const httpLink = createHttpLink({
    uri: process.env.GRAPHQL_SERVER_ENDPOINT,
  });

  const authLink = setContext((_, { headers }) => {
    // Include the Authorization header only if authToken is provided
    const authHeader = authToken
      ? { authorization: `Bearer ${authToken}` }
      : {};
    return {
      headers: {
        ...headers,
        ...authHeader,
      },
    };
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
}
