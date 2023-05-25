import 'dotenv/config'
import express from 'express';
import session from 'express-session';
import { engine } from 'express-handlebars';
import { router } from './routes.js';
import mongoose from 'mongoose';
import moment from 'moment';
import fileUpload from 'express-fileupload';
import Handlebars from 'handlebars';
import flash from 'express-flash';

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Successfull connection");
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
}));

app.use(
    fileUpload({
        limits: {
            fileSize: 10000000,
        },
        abortOnLimit: true,
    })
);

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.engine(
    "hbs",
    engine({
        extname: '.hbs',
        helpers: {
            moment: function (date) {
                return moment(date).fromNow(); // Returns the relative time from now
            },
        },
    })
);
app.set("view engine", "hbs");

app.use(flash());
app.use('/', router);


Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper('gt', function(arg1, arg2, options) {
    return (arg1 > arg2) ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper('lt', function(arg1, arg2, options) {
    return (arg1 < arg2) ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper('add', function(arg1, arg2) {
    return arg1 + arg2;
});

Handlebars.registerHelper('subtract', function(arg1, arg2) {
    return arg1 - arg2;
});

Handlebars.registerHelper('range', function(start, end, options) {
    var result = '';
    for (var i = start; i <= end; i++) {
        result += options.fn(i);
    }
    return result;
});

Handlebars.registerHelper('likesInclude', function (likes, userId, options) {
    for (let i = 0; i < likes.length; i++) {
        if (likes[i].toString() === userId) {
            return true
        }
    }
    return false;
});

const HOST = process.env.HOST || localhost;
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Η εφαρμογή ξεκίνησε στο http://${HOST}:${PORT}`));