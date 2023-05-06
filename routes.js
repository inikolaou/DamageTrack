import express from 'express';
import fs from 'fs/promises'

const router = express.Router();

router.get('/', (req, res) => {
    res.render('homepage');
});

router.get('/sign', (req, res) => {
    res.render('signupLogin', {layout: "sign"});
})

router.post("/login", async (req, res) => {
    console.log(req.body['loginEmail']);
    console.log(req.body['loginPassword']);
    res.redirect('/');
});

router.post("/signup", async (req, res) => {
    console.log(req.body['signUpEmail']);
    console.log(req.body['signUpPassword']);
    console.log(req.body['signUpFirstName']);
    console.log(req.body['signUpLastName']);
    console.log(req.body['signUpPhone']);
    console.log(req.body['signUpCity']);
    res.redirect('/');
});

router.get('/report', (req, res) => {
    res.render('reportForm',  { layout: 'report' });
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
    res.render('adminDashboard',  { layout: 'admin' });
 });

export { router };