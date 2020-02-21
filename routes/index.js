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
        req.session.username = result;
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

router.get('/feedback',(req, res) => {
    if(req.session.username !== undefined){
        return res.render('allViews/feedback',{
            'title':'feedback',
            'layout':'main'
        });   
    }else{
        return res.render('allViews/login', {
            'title': 'login',
            'layout': 'main'
        });
    }
});

router.post('/feedback', (req, res) => {
    authCtr.feedback(req.body).then((result) => {
        res.json({
            message:"feedback given successfully !!!"
        })  
    }).catch((err) => {
      res.json({
          message:"something went wrong while giving feedback !!!"
      })  
    });
});

router.get('/admin', (req, res) => {
    authCtr.avgFeedback().then((result) => {
        return res.render('allViews/admin',{
            title:"Admin",
            layout:"main",
            data:result
        });
    }).catch((err) => {
        res.json({
            message:"something went wrong !!!"
        });
    });
});

router.post('/admin', (req, res) => {
    authCtr.admin().then((result) => {
        res.json({
            message:"Funds are transfered !!!"
        })
    }).catch((err) => {
        res.json({
            message:"Funds are not transfer !!!"
        })
    });
});
module.exports = router;