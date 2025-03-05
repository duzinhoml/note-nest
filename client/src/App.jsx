import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css'

import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Outlet } from 'react-router-dom';

import { SidebarProvider } from './context/SidebarContext.jsx';
import { SearchProvider } from './context/SearchContext.jsx';
import { FormDataProvider } from './context/FormDataContext.jsx';
import { InputRefProvider } from './context/InputRefContext.jsx';
import { NotesProvider } from './context/NotesContext.jsx';
import { NoteListProvider } from './context/NoteListContext.jsx';

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

        <SearchProvider>
          <SidebarProvider>
            <FormDataProvider>
              <InputRefProvider>
                <NotesProvider>
                  <NoteListProvider>
                    <Outlet />
                  </NoteListProvider>
                </NotesProvider>
              </InputRefProvider>
            </FormDataProvider>
          </SidebarProvider>
        </SearchProvider>
        
      </ApolloProvider>
    </>
  )
}

export default App
