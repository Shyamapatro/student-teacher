var express = require("express");
var router = express.Router();
const sendResponse = require("../Helper/sendResponse");
const studentController = require("../controllers/studentController");
const authentication = require("../middlewares/studentAuthentication").verifyToken;

router.post("/add-student",(req, res) => {
	let payload = req.body
	return sendResponse.executeMethod(studentController.addStudent, payload, req, res);
});

router.put("/reset-password", (req, res) => {
	return sendResponse.executeMethod(studentController.resetNewPassword, req.body, req, res);
});

router.post("/login", (req, res) => {
	return sendResponse.executeMethod(studentController.login, req.body, req, res);
});
router.get("/get",authentication, (req, res) => {
	 let payload = req.query;
	 payload.id = req.credentials._id;
   return sendResponse.executeMethod(studentController.getStudent, payload, req, res);
});

router.delete("/delete/:id", (req, res) => {
    return sendResponse.executeMethod(studentController.deleteStudent,req.params,req, res);
});



router.put("/fav-teacher",authentication, (req, res) => {
	let payload=req.body
	
     payload.id = req.credentials._id;
	console.log("credentials>>>>>>",payload)
	return sendResponse.executeMethod(studentController.favTecher, payload, req, res);
});

module.exports = router;