
var express=require('express');
var router = express.Router();

router.post('/acreate',insertanounce);
router.delete('/adelete',deleteanounce);

function insertanounce(req, res){
	res.json({"msg" : "new announcement "});
	};

function deleteanounce(req, res){
	res.json("annonce deleted");
};

module.exports = router;


