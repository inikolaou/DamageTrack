import express from 'express';
import fs from 'fs/promises'

const router = express.Router();

router.get('/', (req, res) => {
    res.render('homepage');
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