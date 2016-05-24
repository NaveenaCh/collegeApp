var express=require('express');
var router = express.Router();
var nodemailer = require("nodemailer");
var LocalStrategy   = require('passport-local').Strategy;
var user = require('../models/user');
var bCrypt = require('bcrypt-nodejs');



// router.post('/create',);


router.get('/listall',show);
router.get('/list/:id',showsingle);
router.delete('/delete/:id', deletestudent);
// router.put('/edit/:id', editstudent);


router.get('/student',function createstudent(req, res)
{

          var user = new user(req.body);
          var mailOptions={
        to : user.email,
        subject : "email verification message",
        text : " ur mail verified"
    }
        smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error);
           res.end("error");
     }else{
            console.log("Message sent: " + response.message);
            res.end("sent");
          }
        });

          user.save(function(err, user){
     if(err){
        console.log("record not inserted");
        res.statusCode = 404;
     }
     if(user){
        res.json("record created");




          // res.redirect('/student/listall');
       
             }
 });

 
})

function deletestudent(req, res){
  
  user.remove({_id:req.params.id},function(err, doc){
   
  res.json("record Deleted");

  });
}


function show(req,res){

  user.find({}, function(err, list){
    res.render('showstudents.html', {"students" : list});
    });
  }


function showsingle(req , res){
   user.findById(req.params.id, function(err, student) {
            if (err){
                res.send(err);
              }
              console.log(student.id);
            res.json(student);
            
                    });
}

function editstudent(req,res)
{    
user.update({_id:req.params.id}, {$set:{username:req.body.username,
            phone_numbers :req.body.phone_numbers,
            college_name :req.body.college_name,
            address : req.body.address}}, {w:1}, function(err, result) {
              if(err){
                console.log(err.stack);
              }
              res.json({ message: 'student updated!' });
            });

       

}


 return router;
