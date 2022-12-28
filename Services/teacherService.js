
const Model = require("../models");
const Response = require("../config/response");
const baseService = require("./base");

exports.addStudent = async (objToSave) => {
	var newUserData= new Model.Teacher(objToSave);
	console.log("newUserData",newUserData)
	return await baseService.saveData(newUserData);
};

exports.updateStudent=async(criteria,objToSave)=>{
	console.log("Data",objToSave)
	return await baseService.updateData(Model.Student, criteria,objToSave);
}

exports.getstudent = async(criteria, projection) => {
	console.log(`get Only One Details`,criteria, projection)
	return await baseService.getSingleRecord(Model.Student, criteria, projection);
};
 

exports.getAllStudents = (projection) => {
	console.log("projection",projection)
	return new Promise((resolve, reject) => {
		Model.Student.find({},projection)
			.then(result => {
				console.log("result",result)
				resolve(result);
			}).catch(err => {
				console.log("getAll err ==>>  ", err);
				reject(Response.error_msg.implementationError);
			});
	});
};
