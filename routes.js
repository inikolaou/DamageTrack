import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('homepage');
});

router.get('/sign', (req, res) => {
    res.render('signupLogin', {layout: "sign"});
})

export { router };