import 'whatwg-fetch';
import App from './App';
import React from 'react';
import './styles/app.scss';
import * as ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {auth} from './helpers';
import {StoreProvider} from '@assets/reducers/storeReducer';

const isProduction = process.env.NODE_ENV === 'production';

window.isAuthenticated = false;

auth.onAuthStateChanged(async function(user) {
  ReactDOM.render(
    <StoreProvider>
      <App />
    </StoreProvider>,
    document.getElementById('app')
  );
});

if (isProduction) {
  serviceWorker.register();
}

if (module.hot) module.hot.accept();
