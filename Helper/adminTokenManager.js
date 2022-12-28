"use strict ";
var Jwt = require("jsonwebtoken");
var Service = require("../services");
const Response = require("../config/response");
const messages = require("../config/messages");
var setTokenInDBAdmin = async (userId, token) => {
	var dataToSave = {
		userId: userId,
		accessToken: token,
	};
	let condition = {
		userId: userId,
	};
	await Service.studentSessionService.deleteSessionData(condition);
	let createSession = await Service.studentSessionService.saveSessionData(dataToSave);
	console.log("createSession",createSession)
	if (!createSession) throw Response.error_msg.implementationError;
};
var expireTokenInDBAdmin = async (userId) => {
	let condition = {
		userId: userId,
	};
	return await Service.studentSessionService.deleteSessionData(condition);
};
var setTokenAdmin = (tokenData, PRIVATE_KEY, callback) => {
	console.log('setAdmintoken',tokenData, PRIVATE_KEY,)
	if (!tokenData._id) {
		callback(Response.error_msg.implementationError);
	} else {
		var tokenToSend = Jwt.sign(tokenData, PRIVATE_KEY);
		setTokenInDBAdmin(tokenData._id, tokenToSend);
		callback(null, { accessToken: tokenToSend });
	}
};
var expireTokenAdmin = (token, callback) => {
	expireTokenInDBAdmin(token._id);
	callback(null, messages.success.LOGOUT);
};
module.exports = {
	expireToken: expireTokenAdmin,
	setToken: setTokenAdmin,
};