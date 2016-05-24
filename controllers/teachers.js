var express=require('express');
var router = express.Router();


var mongoose = require('mongoose');
var teacher = mongoose.model('teacher');


router.post('/tinsert',insertteacher);
router.put('/tedit',editteacher);
router.delete('/tdelete/:id',delteacher);
router.get('/tget', teacherdetails);

function insertteacher(req, res){
  console.log(req.body);
   var user = new teacher(req.body);

   user.save(function(err, rec){
     if(err){
        console.log("record not inserted");
        res.statusCode = 404;
     }
     if(rec){
      console.log(rec);
     //	console.log("teacher id:"+rec.id);
        res.json(rec);
       }
   });
}

function delteacher(req, res){

   teacher.remove({_id:req.params.id},function(err, doc){
      if (err){
   	    console.log(err.stack);
        }
    res.json("record Deleted");
   });
		
}

function editteacher(req, res){
		
		teacher.update({_id:req.params.id}, {$set:{ teachername: req.body.teachername,
        qualification: req.body.qualification,
        mail: req.body.mail,
        phone_num: req.body.phone_num}}, {w:1}, function(err, result) {
              if(err){
                console.log(err.stack);
              }
              console.log(result);
              res.json({ message: 'teacher details updated!' });
            });

	}
function teacherdetails(req, res){
		
		teacher.find({}, function(err, list){
    console.log(list);
    res.json("all the records of teachers in database:"+list);
    });
	}

module.exports = router;