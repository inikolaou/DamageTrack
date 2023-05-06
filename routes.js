import express from 'express';

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

export { router };