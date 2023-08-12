import createError from 'http-errors';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import session from 'express-session';
import multer from 'multer';
import mongoose from 'mongoose';
import { renderFile } from 'ejs';

import userRouter from './routes/user.js';
import pageRouter from './routes/page.js';
import noteRouter from './routes/note.js';
import profileRouter from './routes/profile.js';
import feedbackRouter from './routes/feedback.js';

const app = express();
import bodyParser from 'body-parser';

import 'dotenv/config';
import connectMongo from 'connect-mongo';

const MongoStore = connectMongo(session);
import { connectMongoDb } from './utils/mongo.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const upload = multer();

app.use(logger('dev'));
app.set('views', path.join(__dirname, 'views'));
app.engine('html', renderFile);
app.set('view engine', 'ejs');
app.use('/static',express.static('public'));
app.use(cookieParser());
app.use(session({
    secret: "Your secret key",
    resave: true,
    saveUninitialized: true,
    store:  new  MongoStore({
        mongooseConnection: mongoose.connection,
        collection: 'session',
    })
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());

(async () => {
    await connectMongoDb(process.env.MONGODBKEY);
})();

// Health check route
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

app.use('/', pageRouter);
app.use('/user', userRouter);
app.use('/note', noteRouter);
app.use('/profile', profileRouter)
app.use('/feedback', feedbackRouter)

app.use('/dashboard', function(req, res, next) {
    res.redirect('/login');
});

app.use((req, res, next) => {
    setImmediate(() => {
      next(new Error('Something went wrong'));
    });
  });


app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
});

export default app;
