import React from 'react';
import './App.css';
import BookList from './components/BookList';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

//apollo client
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
        <div className="App" style={{ marginTop: '50px'}}>
            <h1 className="text-center">GraphQL BookHub</h1>
            <BookList/>
        </div>
    </ApolloProvider> 
  );
}

export default App;
