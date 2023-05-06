import express from 'express';
import { engine } from 'express-handlebars';
import { router } from '.routes.js';

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.engine("hbs", engine({ extname: ".hbs" }));
app.set("view engine", "hbs");

app.use('/', router);

app.use((req, res) => {
    res.redirect('/');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Η εφαρμογή ξεκίνησε στο http://127.0.0.1:${PORT}`));