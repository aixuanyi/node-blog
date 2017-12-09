var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.cookies.username){
	    res.render('index', { title: '我的博客',username:req.cookies.username});
	  }else{
	    res.render('login', { title: '我的博客--登录'});
	  }
});
router.get('/login', function(req, res, next) {
  res.render('login');
});



module.exports = router;
