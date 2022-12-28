var express = require("express");
var router = express.Router();
const sendResponse = require("../Helper/sendResponse");
const studentController = require("../controllers/studentController");
// const authentication = require("../middleware/adminAuthentication.js").verifyToken;

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



// authentication,
router.put("/logout", (req, res) => {
	let token = req.credentials;
	return sendResponse.executeMethod(studentController.logout, token, req, res);
});
router.get("/get", (req, res) => {
	 let payload = req.query;
   return sendResponse.executeMethod(studentController.getAllStudent, payload, req, res);
});
// authentication, 
router.put("/profile-edit", async (req, res) => {
  let payload = req.body;

	payload.id = req.credentials.id;
	return sendResponse.executeMethod(studentController.updateStudent, payload, res);
});



router.post("/forgot-password", (req, res) => {
	let payload = req.body;
	return sendResponse.executeMethod(studentController.forgotPassword, payload, req, res);
});
// authentication, 
router.get("/profile", (req, res) => {
	let token = req.credentials;
	return sendResponse.executeMethod(studentController.getAdminProfile, token.id, req, res);
});
// authentication,
router.get('/getadmin-detail/',async (req, res) => {
    let payload=req.query
	  payload.id = req.credentials.id;
    return sendResponse.executeMethod(studentController.getAdminDetail,payload,req,res)
});


   
router.delete("/delete/:id", (req, res) => {
    return sendResponse.executeMethod(studentController.deleteStudent,req.params,req, res);
});

module.exports = router;