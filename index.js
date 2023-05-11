import express from 'express';
import { engine } from 'express-handlebars';
import { router } from './routes.js';

import session from 'express-session';

// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/playground')
//     .then(() => console.log('Connected to MongoDB...'))
//     .catch(err => console.error('Could not connect to MongoDB...', err));
//mongodb://localhost:27017

import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://odkopakakis:xaripoter@damagetrack.wu1w1js.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });


const app = express();


app.use(session({
    secret: process.env.secret || "PynOjAuHetAuWawtinAytVunarAcjeBlybEshkEjVudyelwa",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        sameSite: true,
        maxAge: 600000 // Time is in miliseconds
    },
    // store: new MemoryStore({ checkPeriod: 86400000 })
}))


app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.engine("hbs", engine({ extname: ".hbs" }));
app.set("view engine", "hbs");

app.use('/', router);

app.use((req, res) => {
    res.redirect('/');
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Η εφαρμογή ξεκίνησε στο http://127.0.0.1:${PORT}`));