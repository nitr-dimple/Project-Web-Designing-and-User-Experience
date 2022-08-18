import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './routes/index.js';
import bodyParser from 'body-parser';
import models from './models/index.js';
import session from 'express-session'
import connectStore from "connect-mongo"; //npm i connect-mongo@3
import {PORT, NODE_ENV, MONGO_URI, SESS_LIFETIME, SESS_NAME, SESS_SECRET} from './config.js'

const app = express();

const MAX_AGE = 1000 * 60 * 60 * 3; // Three hours
// mongoose.connect('mongodb://localhost:27017/musicapp');
mongoose.connect(MONGO_URI)

const MongoStore = connectStore(session);

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use(bodyParser.json());

app.use(session({
    name: SESS_NAME,
    secret: SESS_SECRET,
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      collection: 'session',
      ttl: parseInt(SESS_LIFETIME) / 1000
    }),
    cookie: {
      sameSite: true,
      secure: NODE_ENV === 'production',
      maxAge: parseInt(SESS_LIFETIME) / 1000
    }
  }));

routes(app);

export default app;