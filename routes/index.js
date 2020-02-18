'use strict';
const express = require('express');
const router = express.Router();
const authCtr = require('../controllers/index');

router.get('/', (req, res) => {
    return res.redirect('/login');
});

router.get('/login', (req, res) => {
    return res.render('allViews/login', {
                'title': 'login',
                'layout': 'main'
            });
});

router.post('/login', (req, res) => {
    authCtr.login(req.body).then((result) => {
        console.log("result-->",result)
        res.json({
            username:result,
            message:"user login succesfully !!!"
        })
    }).catch((err) => {
        res.json({
            message:"login failed !!!"
        })
    });
});

router.get('/register', (req, res) => {
return res.render('allViews/register',{
    'title': 'register',
    'layout': 'main'
    })
});

router.post('/register', (req, res) => {
    authCtr.register(req.body).then((result) => {
        console.log("result-->",result)
        res.json({
            message:"User registered successfully !!!"
        })
    }).catch((err) => {
        res.json({
            message:"something went wrong while registering !!!"
        })
        console.log("error-->",err)
    });
});

// router.get('/hello', (req, res) => {
//     res.render('authentication/hello', {
//         'title': 'hello',
//         'layout': 'main'
//     });
// });
// router.get('/election', (req, res) => {
//     authCtr.depoyContract().then((result)=>{
//         console.log("accounts-->",result);
//         res.render('election/voting', {
//             'title': 'hello',
//             'layout': 'main',
//             'data': result
//         });
//     }).catch((err)=>{
//         console.log("Error-->",err);
//     });
// });

router.get('/compiler', (req, res) => {
    authCtr.compiler().then((result)=>{
        console.log("accounts-->",result);
        res.render('authentication/hello', {
            'title': 'hello',
            'layout': 'main'
        });
    }).catch((err)=>{
        console.log("Error-->",err);
    });
});

// router.post('/vote', (req, res) => {
//     authCtr.vote(req.body).then((result) => {
//         res.json({
//             hash:result,
//             message:"voted successfully"
//         })
//         console.log("result-->",res);
//     }).catch((err) => {
//         console.log("Error-->",err);
//         res.json({
//             message:err.message
//         })
//     });
// });
module.exports = router;