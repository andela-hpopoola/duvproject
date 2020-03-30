import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import logger from 'morgan';
import passport from 'passport';
import bodyParser from 'body-parser';

import router from './server/routes';

dotenv.config();

const port = parseInt(process.env.PORT, 10) || 8080;

const app = express();

app.use(passport.initialize());

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
router(app);

// set the view engine to ejs
app.set('view engine', 'ejs');

// Serve any static files
app.use(express.static(path.join(__dirname, 'build')));

// Logo displayed in sent emails
app.get('/email-logo.png', function(req, res) {
  res.sendFile(path.join(__dirname, 'server', 'email-template', 'logo.png'));
});

if (process.env.NODE_ENV === 'production') {
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

app.listen(port, () => {
  console.info(`Started up the server at port ${port}`);
});
