
const Model = require("../models");
const Response = require("../config/response");
const baseService = require("./base");



exports.saveSessionData = async (objToSave) => {
	var newUserData= new Model.Session(objToSave);
	console.log("newUserData",newUserData)
	return await baseService.saveData(newUserData);
	
	
};


 
exports.deleteSessionData = async(objToSave,critiria) => {
	var newUserData= new Model.Session(objToSave);
	console.log("newUserData",newUserData)
	return await baseService.delete(newUserData,critiria);
};
