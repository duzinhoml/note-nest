import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css'

import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Outlet } from 'react-router-dom';

import { OffcanvasProvider } from './components/Dashboard/OffcanvasContext.jsx';
import { NoteListProvider } from './components/CRUD/NoteList/NoteListContext.jsx';

import Navbar from './components/Navbar.jsx';

const httpLink = createHttpLink({
  uri: process.env.NODE_ENV === 'production' ? '/graphql' : 'http://localhost:3001/graphql'
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

function App() {

  return (
    <>
      <ApolloProvider client={client}>
        <NoteListProvider>
          <OffcanvasProvider>
            <Navbar/>
            <Outlet />
          </OffcanvasProvider>
        </NoteListProvider>
      </ApolloProvider>
    </>
  )
}

export default App
