import { ApolloProvider } from '@apollo/client';
import { client } from './client';
import Inventory from './Inventory';
import './App.css';

function App() {
  return (
    <ApolloProvider client={client}>
      <Inventory />
    </ApolloProvider>
  );
}

export default App;
