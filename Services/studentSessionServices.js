
const Model = require("../models");
const Response = require("../config/response");
const baseService = require("./base");



exports.saveSessionData = async (objToSave) => {
	var newUserData= new Model.Session(objToSave);
	console.log("newUserData",newUserData)
	return await baseService.saveData(newUserData);
	
	
};


 
exports.deleteSessionData = async(objToSave,criteria) => {
	var newUserData= new Model.Session(objToSave);
	console.log("newUserData",newUserData)
	return await baseService.delete(newUserData,criteria);
};


exports.getSessionDetail =async (criteria, projection) => {
	return await baseService.getSingleRecord(Model.Session, criteria, projection);
};