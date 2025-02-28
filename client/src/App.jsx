import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css'

import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Outlet } from 'react-router-dom';

import { SidebarProvider } from './testComponents/Sidebar/context.jsx';
import { NoteActionsProvider } from './testComponents/NoteActions/context.jsx';

// import { FolderListProvider } from './context/FolderListContext.jsx';
import { NoteListProvider } from './context/NoteListContext.jsx';
// import { OffcanvasProvider } from './context/OffcanvasContext.jsx';

// import Navbar from './components/Navbar.jsx';

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

        {/* <FolderListProvider> */}
        <SidebarProvider>
          <NoteActionsProvider>
            <NoteListProvider>
              {/* <OffcanvasProvider> */}

                {/* <Navbar/> */}
                <Outlet />

              {/* </OffcanvasProvider> */}
            </NoteListProvider>
          </NoteActionsProvider>
        {/* </FolderListProvider> */}
        </SidebarProvider>
      </ApolloProvider>
    </>
  )
}

export default App
