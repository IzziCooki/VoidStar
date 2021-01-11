
import { google } from 'googleapis';

const googleConfig = {
  clientId: '320293691145-g8nuctrcbntstebrnhj56qmh3h5kapcn.apps.googleusercontent.com', 
  clientSecret: '6cPLN5o4okbhyXqSplBOAG_d', 
  redirect: 'https://your-website.com/google-auth' 
};

function createConnection() {
  return new google.auth.OAuth2(
    googleConfig.clientId,
    googleConfig.clientSecret,
    googleConfig.redirect
  );
}

const defaultScope = [
  'https://www.googleapis.com/auth/plus.me',
  'https://www.googleapis.com/auth/userinfo.email',
];

/**
 * Get a url which will open the google sign-in page and request access to the scope provided (such as calendar events).
 */
function getConnectionUrl(auth) {
  return auth.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent', // access type and approval prompt will force a new refresh token to be made each time signs in
    scope: defaultScope
  });
}
