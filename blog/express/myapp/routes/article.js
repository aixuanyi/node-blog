var express = require('express');
var router = express.Router();
var url = require('url');

var MySql = require("./../md/MySql.js")

/* GET users listing. */
router.get('/', function(req, res, next) {
  
   MySql.connect((err)=>{
   	console.log(err);
   },(db) => {
   	  MySql.findData(db,'articles',{},{},(result) =>{
   	  	 res.render("article",{title:"我的博客--article",list:result,username:req.cookies.username})
   	  	 db.close()
   	  })
   })
});

router.post('/addAritcles',(req,res,next) => {
	var obj = req.body;
	MySql.connect((err) => {
		console.log(err);
	},(db) => {
		MySql.findData(db,'articles',{},{},(result) => {
			obj.articleId = result.length;
			MySql.insert(db,'articles',obj,(results) => {
				res.send('1');
				db.close();
			})
			db.close();
		})
	})
})

router.get('/articlesList',(req,res,next) => {
	MySql.connect((err)=>{
     console.log(err)
   },(db)=>{
     MySql.findData(db,"articles",{},{},(result) => {
       res.send(JSON.stringify(result))
      db.close();
     })
   })
})

router.post("/articleDetail", (req, res, next) =>{
  var obj = req.body;
  obj.articleId =  obj.articleId * 1;
  MySql.connect((err)=>{
     console.log(err)
   },(db)=>{
     MySql.findData(db,"articles",obj,{},(result) => {
       res.send(JSON.stringify(result))
      db.close();
     })
   })
})

router.post("/articleRecommend",(req,res,next) => {
	var obj = req.body;
  	obj.articleId =  obj.articleId * 1;
  	MySql.connect((err)=>{
      console.log(err)
    },(db)=>{
      MySql.findDisCountData(db,"articles",{type:{$exists:true}},{},(result) => {
        res.send(JSON.stringify(result))
        db.close();
      })
   })
})

router.get('/articleDelete',(req,res,next) => {
	var obj = url.parse(req.url,true).query;
	obj.articleId  = obj.articleId * 1;
	MySql.connect((err) =>{
		console.log(err)
	},(db) => {
		MySql.deleteOneData(db, "articles", obj, (result) => {
	       db.close();
	       res.send("<script>window.location.href='/article';</script>")
	  
	     })
	})
	
})

module.exports = router;