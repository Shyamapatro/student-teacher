
const Model = require("../models");
const Response = require("../config/response");
const baseService = require("./base");

exports.addTeacher = async (objToSave) => {
	var newUserData= new Model.Teacher(objToSave);
	console.log("newUserData",newUserData)
	return await baseService.saveData(newUserData);
};

exports.updateTeacher=async(criteria,objToSave)=>{
	console.log("Data",objToSave)
	return await baseService.updateData(Model.Teacher, criteria,objToSave);
}

exports.deleteTeacher=async(criteria)=>{

	return await baseService.delete(Model.Teacher, criteria);
}

exports.getTeacher = async(criteria, projection) => {
	console.log(`get Only One Details`,criteria, projection)
	return await baseService.getSingleRecord(Model.Teacher, criteria, projection);
};
 

exports.getAllTeachers = (projection) => {
	console.log("projection",projection)
	return new Promise((resolve, reject) => {
		Model.Teacher.find({})
			.then(result => {
				console.log("result",result)
				resolve(result);
			}).catch(err => {
				console.log("getAll err ==>>  ", err);
				reject(Response.error_msg.implementationError);
			});
	});
};
