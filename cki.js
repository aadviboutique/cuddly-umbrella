const express = require('express');
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);
const util = require('util');

// express-session configuration 
const sessionMiddleware = session({ 
	store: new SQLiteStore({
      table: 'sessions',
      db: 'sessions.db',
      dir: __dirname 
    }),
    secret: 'H@rden y0ur c00k1e5',
 	saveUninitialized: false,
  	resave: false,
  	rolling: true,
  	name: 'ssid',
  	domain: 'localhost',
  	// httpOnly: true,        ##### HttpOnly- Don't allow scripts to access cookie. You can set both of the Secure and HttpOnly.
  	// secure: true,          ##### Secure - Cookie will be sent in HTTPS transmission only.
  	// sameSite: 'strict'     ##### Instructs browsers to control whether cookies are sent along with the request initiated by third party websites
});

const app = express();

// tell Express to use the 'sessionMiddleware'
app.use(sessionMiddleware);

app.get('/', (req, res) => {
  // trigger the 'Set-Cookie' (otherwise no cookie would be set)
  req.session.counter = (req.session.counter || 0) + 1;
  
  res.send(util.format('You have ve visited this page %dtimes',
    req.session.conter));
});

app.listen(4000, () => {
  console.log('Application listening on port 4000');
});
