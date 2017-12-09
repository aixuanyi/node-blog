var express = require('express');
var router = express.Router();

var url = require('url');
var MySql = require("./../md/MySql.js");
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/loginAction', function(req, res, next) {
	var obj = req.body;
	MySql.connect((err) => {
		if(err){
			res.send('2');
		}
	},(db) => {
//		console.log("数据库连接成功")
			MySql.findData(db,'admin',obj,{},(result)=>{
				if(result.length>0){
					res.cookie("username",obj.username)
					res.send('1');
					console.log(obj.username)
				}else{
					res.send('0');
				}
			})
	})
});
router.get('/logout',(req,res,next) => {
	res.clearCookie("username");
	res.redirect('/')
})
module.exports = router;
