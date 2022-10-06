import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Auth0Provider} from '@auth0/auth0-react';
import { UserProvider } from './context/UserContext';
import { EventActionProvider } from './context/EventActionContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Auth0Provider
      domain={process.env.REACT_APP_DOMAIN}
      clientId={process.env.REACT_APP_CLIENT_ID}
      redirectUri={process.env.REACT_APP_REDIRECT_URL}
    >
      <UserProvider>
        <EventActionProvider>
          <App />
        </EventActionProvider>
      </UserProvider>
    </Auth0Provider>
)

