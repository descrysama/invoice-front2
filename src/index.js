import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { ChakraProvider } from '@chakra-ui/react'
import App from './App';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import { checkAuth } from './app/stores/storeSlice';


const container = document.getElementById('root');
const root = createRoot(container);



async function init() {

  await store.dispatch(checkAuth());
  
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </Provider>
    </React.StrictMode>
  );
}

init();

