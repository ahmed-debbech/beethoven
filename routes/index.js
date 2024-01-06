var express = require('express');
var router = express.Router();
var encryptor = require('../utils/check_pass');
var sessions = require('../utils/session_manager')

/* GET home page. */
router.get('/', function(req, res, next) {
  if(!req.query.state || req.query.state == 'true'){
    res.render('index', {state : true});
  }else{
    res.render('index', {state : false});
  }
});
router.post('/login', async function(req, res, next) {
  let f = await encryptor.compare(req.body.pass, req.body.user);
  if(f){
    let token = encryptor.gen_token()
    res.cookie('ses_token', token, { maxAge: 86400000 });
    sessions.addSession(token);
    res.redirect('/dash')
  }else{
    res.redirect('/?state=false')
  }
});

router.get('/dash', function(req, res, next) {
  res.render('dash')
});

router.get('/hook', function(req, res, next) {
  console.log(req.body);
});

module.exports = router;
