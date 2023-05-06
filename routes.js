import express from 'express';
import fs from 'fs/promises';
import { User } from './model/model.js'

const router = express.Router();

router.get('/', (req, res) => {
    res.render('homepage', { 
        session: req.session.mySessionName,
        css: "index.css"
    });
});

router.get('/sign', (req, res) => {
    if (req.session.mySessionName == undefined) {
        res.render('signupLogin', { 
            css: "signupLogin.css",
            js: "signupLogin.js"
        });
    }
    else {
        res.redirect('/');
    }
});

router.get("/logout", (req, res) => {
    if (req.session.mySessionName == undefined) {
        res.redirect('/');
    }
    else {
        req.session.destroy((err) => { console.log("session destroyed") });
        res.redirect('/');
    }
})

router.post("/login", async (req, res) => {
    let user = await User.find({
        email: req.body['loginEmail'],
        password: req.body['loginPassword']
    }).limit(1);

    // User not authenticated
    if (user.length === 0) {
        res.redirect('/sign');
    }
    else {
        if (req.session.mySessionName == undefined) {
            req.session.mySessionName = 'damageTrack-session';
            console.log("session started:", req.session);
            res.redirect('/');
        }
        else {
            res.redirect('/');
        }
    }
});

router.post("/signup", async (req, res) => {
    let newUser = new User({
        email: req.body['signUpEmail'],
        password: req.body['signUpPassword'],
        firstName: req.body['signUpFirstName'],
        lastName: req.body['signUpLastName'],
        phone: req.body['signUpPhone'],
        city: req.body['signUpCity']
    });

    await newUser.save();

    res.redirect('/');
});

router.get('/report', (req, res) => {
    res.render('reportForm', { layout: 'report' });
});

router.post('/report', (req, res) => {

    const { category, description, urgency, photo, city, street, number, zip } = req.body;


    const formData = {
        category,
        description,
        urgency,
        photo,
        location: {
            city,
            street,
            number,
            zip
        }
    };


    const jsonData = JSON.stringify(formData);
    console.log("json Data");


    fs.writeFile('formdata.json', jsonData, (err) => {
        if (err) {
            console.error(err);

            res.render('error');
        } else {
            console.log("file created");
            res.redirect('/thank-you');
        }
    });
});


router.get('/admin', (req, res) => {
    res.render('adminDashboard', { layout: 'admin' });
});

export { router };