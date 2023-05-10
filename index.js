import 'dotenv/config'
import express from 'express';
import session from 'express-session';
import { engine } from 'express-handlebars';
import { router } from './routes.js';
import mongoose from 'mongoose';

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
}))

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.engine("hbs", engine({ extname: ".hbs" }));
app.set("view engine", "hbs");

app.use('/', router);

app.use((req, res) => {
    res.redirect('/');
});

const HOST = process.env.HOST || localhost;
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Η εφαρμογή ξεκίνησε στο http://${HOST}:${PORT}`));