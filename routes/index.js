var express = require('express');
var router = express.Router();
var encryptor = require('../utils/check_pass');
var sessions = require('../utils/session_manager')
var dash = require('../utils/dash')
var bash = require("../utils/bash")
var files = require("../utils/readfile")

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
  let serv = dash.getServices()
  res.render('dash', {path : serv.path, services : serv.services})
});

router.get('/dash/result', function(req, res, next) {
  let path = dash.getPath();
  let content = files.readFileDirectly(path + "/buffer")
  console.log("eee " + content)
  res.json({result : content});
});

router.get('/dash/:serviceId/:action', async function(req, res, next) {
  console.log( req.params.serviceId+ "/" +req.params.action)
  let result = await bash.receive(req.params.serviceId, req.params.action)
  console.log(result)
  res.json({done : "done"})
});

router.get('/hook', function(req, res, next) {
  console.log(req.body);
});

module.exports = router;
