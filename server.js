import express from 'express';
import session from 'express-session';
import axios from 'axios';
import dotenv from 'dotenv';
import logger from 'morgan';
import path from 'path';
import bodyParser from 'body-parser';

dotenv.config();
const app = express();

app.use(express.static(path.resolve(__dirname, 'build')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  session({
    secret: 'qwerty',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000,
      httpOnly: false,
      secure: true
    }
  })
);
// This is the client ID and client secret that you obtained
// while registering the application
const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_SECRET;
const PORT = process.env.PORT || 8080;

// Declare the redirect route
app.get('/oauth/redirect', async (req, res) => {
  // The req.query object has the query params that
  // were sent to this route. We want the `code` param
  const requestToken = req.query.code;
  const response = await axios({
    // make a POST request
    method: 'post',
    // to the Github authentication API, with the client ID, client secret
    // and request token
    url: `https://github.com/login/oauth/access_token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${requestToken}`,
    // Set the content type header, so that we get the response in JSOn
    headers: {
      accept: 'application/json'
    }
  });
  // Once we get the response, extract the access token from
  // the response body
  const accessToken = response.data.access_token;
  req.session.token = accessToken;
  res.redirect(`/welcome.html?access_token=${accessToken}`);
});
app.get('*', (req, res) => {
  if (req.session.token) console.log('Got session token from Github');
  res.send(path.resolve(__dirname, 'index.html'));
});
const server = app.listen(PORT, err => {
  if (err) console.log('Error encountered');
  else console.log(`Server listening on port ${server.address().port}`);
});
