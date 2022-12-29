const Jwt = require("jsonwebtoken");
const Services = require("../services");
require("dotenv").config();
const response = require("../config/response");
const verifyToken = async(req, res, next) => {
	try {
		if (req.headers && req.headers.authorization) {
			var token = req.headers.authorization;
			token = token.replace("Bearer ", "");
			let tokenData = await Jwt.verify(token, process.env.PRIVATE_KEY);
			let adminSession = await Services.studentSessionService.getSessionDetail({
				"adminId": tokenData._id,
				"accessToken": token
			}, ["adminId"]);
			if (!adminSession) {
				return res.status(401).json({
					statusCode: 401,
					message: "The token is not valid or User not Found!",
				});
			} else {
				let criteria = {
					"_id": tokenData._id,
					
				};
				let projection = {"_id":1, "email":1 };
				let adminData = await Services.studentService.getstudent(criteria, projection);
				if (adminData) {
					
						req.credentials = tokenData;
						console.log("req.credentials********",req.credentials)
						req.credentials.accessToken = req.headers.authorization;
						await next();
					
				} else {
					return res.status(401).json({
						statusCode: 401,
						message: "The token is not valid or User not Found!",
					});
				}
			}
		} else {
			return res.status(401).send(response.error_msg.invalidToken);
		}
	} catch (err) {
		console.log(err);
		return res.status(401).send(response.error_msg.invalidToken);
	}
};
module.exports = {
	verifyToken: verifyToken
};