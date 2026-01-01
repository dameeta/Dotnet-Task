import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
    uri: 'http://localhost:5555/graphql', 
    // Updated port to 5555 to avoid conflicts
    cache: new InMemoryCache(),
});
