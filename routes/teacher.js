var express = require("express");
var router = express.Router();
const sendResponse = require("../Helper/sendResponse");
const teacherController = require("../controllers/teacherController");


router.post("/add-teacher",(req, res) => {
	let payload = req.body
	return sendResponse.executeMethod(teacherController.addTeacher, payload, req, res);
});

router.get("/get-all-teacher", (req, res) => {
	 let payload = req.query;
   return sendResponse.executeMethod(teacherController.getAllTeacher, payload, req, res);
});

router.delete("/delete-teacher/:id", (req, res) => {
    return sendResponse.executeMethod(teacherController.deleteTeacher,req.params,req, res);
});

router.put("/fav-teacher-count", (req, res) => {
  payload.id = req.credentials.id;
	return sendResponse.executeMethod(teacherController.favTecher, req.body, req, res);
});

module.exports = router;