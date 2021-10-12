const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('./routes/routes');
const app = express();
const firebase = require('./services/admin');
const schedule = require('node-schedule');
const spotify = require('./cron/spotifyCron');
const deezer = require('./cron/deezerCron');

require('dotenv').config();

app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// cron
const job = schedule.scheduleJob('*/1 * * * *', function(){
  spotify.init();
  deezer.init();
});

// check if the auth token is sent in the request
app.use(async function (req, res, next) {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ error: 'No credentials sent!' });
    }
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = await firebase.admin.auth().verifyIdToken(token);
    req.user_id = decodedToken.user_id;
    next();
  } catch (error) {
    res.status(401).json({message: 'Token expired'});
  }
});

app.use('/api/v1', routes);

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message,
    stack: process.env.ENV === 'dev' ? error.stack : '👀'
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening at port localhost:${port}`);
});
