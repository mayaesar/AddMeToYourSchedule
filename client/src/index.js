import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Auth0Provider} from '@auth0/auth0-react';
import { UserProvider } from './context/UserContext';
import { EventActionProvider } from './context/EventActionContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain='dev-ezg7z3yq.us.auth0.com'
      clientId='syS1ZiebRu91CqrbuC0i5fa9DqFkcQCQ'
      redirectUri='http://localhost:3000/sign-in'
    >
      <UserProvider>
        <EventActionProvider>
          <App />
        </EventActionProvider>
      </UserProvider>
    </Auth0Provider>
  </React.StrictMode>
)

