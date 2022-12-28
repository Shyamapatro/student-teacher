const _ = require("underscore");
const moment = require("moment");
const Joi = require("joi");
const Response = require("../config/response");
let commonHelper = require("../Helper/common");
let Services = require("../services");
let message = require("../config/messages");
let studentProjection = {"email":1,"firstName":1, "lastName":1};
var ObjectID = require("mongodb").ObjectID;
require("dotenv").config();
let TokenManager = require("../Helper/adminTokenManager");
module.exports = {
  addStudent: async (payloadData) => {
    console.log(payloadData);
    try {
      const schema = Joi.object().keys({
        firstName: Joi.string().required(),
        lastName: Joi.string().optional(),
        email: Joi.string().optional(),
        gender: Joi.string().optional(),
      });

      let payload = await commonHelper.verifyJoiSchema(payloadData, schema);
      console.log("Payload Data", payload);
      let generatedString = commonHelper.generateRandomString(6, "numeric");
      let condition = {
        email: payload.email,
        isDeleted: 0,
      };


      let checkStudent = await Services.studentService.getstudent(condition, ["id","email"]);
      console.log("checkStudent data", checkStudent);
      if (checkStudent) throw Response.error_msg.alreadyExist;
      let objToSave = {};
      if (_.has(payload, "firstName") && payload.firstName != "")
        objToSave.firstName = payload.firstName;
      if (_.has(payload, "lastName") && payload.lastName != "")
        objToSave.lastName = payload.lastName;
      if (_.has(payload, "email") && payload.email != "")
        objToSave.email = payload.email;
      if (_.has(payload, "gender") && payload.gender != "")
        objToSave.gender = payload.gender;
      objToSave.passwordResetToken = generatedString;
      let addStudentData = await Services.studentService.addStudent(objToSave);
      if (addStudentData) {
        return message.success.ADDED
      } else {
        return Response.error_msg.implementationError
      }
    } catch (err) {
      console.log(err)
      throw Response.error_msg.implementationError
    }
  },
  getAllStudent: async () => {
    console.log("getAllStudent",studentProjection)
    let getAllStudentDetails = await Services.studentService.getAllStudents(studentProjection);
    if (getAllStudentDetails) {
      return getAllStudentDetails;
    } else {
      throw Response.error_msg.recordNotFound;
    }
  },

  login: async (payloadData) => {
    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
    let payload = await commonHelper.verifyJoiSchema(payloadData, schema);
    let emailCriteria = {
      email: payload.email
    
    };
    let projection = [...studentProjection];
    projection.push("password");
    let checkEmailExist = await Services.studentService.getstudent(
      emailCriteria,
      projection
    );
  
    if (checkEmailExist && checkEmailExist._id) {
      console.log("Email already exists",checkEmailExist,checkEmailExist._id)
      let comparePass = await commonHelper.comparePassword(
        payload.password,
        checkEmailExist.password
      );
      let tokenGenerated;

      if (!comparePass) {
        throw Response.error_msg.passwordNotMatch;
      } else {

        let tokenData = {
          email: checkEmailExist.email,
          _id: ObjectID(checkEmailExist._id)
        };

       
        TokenManager.setToken(tokenData, process.env.PRIVATE_KEY, (err, output) => {
          if (err) {
            
            throw Response.error_msg.implementationError;
          } else {
            if (output && output.accessToken) {
              tokenGenerated = output.accessToken;
             
            } else {
              throw Response.error_msg.implementationError;
            }
          }
        });
      
     delete checkEmailExist['password']

       
        let response = {
          accessToken: tokenGenerated,
          adminDetails: checkEmailExist,
        };
        console.log("response=======================",response);
        return response;
      }
    } else throw Response.error_msg.emailNotFound;
  },
  resetNewPassword: async (payloadData) => {
    const schema = Joi.object().keys({
      email: Joi.string().optional(),
      token: Joi.string().optional().required(),
      newPassword: Joi.string().min(5).required(),
    });
    let payload = await commonHelper.verifyJoiSchema(payloadData, schema);

    let adminObj = null;
    let criteria = {
    
      passwordResetToken: payload.token,
    };
    let admin = await Services.studentService.getstudent(
      criteria,
      {"_id":1, "email":1, "password":1}
    );
    console.log("Admin Data",admin)
    if (admin) {
      
     
      console.log("Admin Data=================",admin)
      if (admin && admin._id) {
        let criteria = {
          _id: ObjectID(admin.id)
        };
        let objToSave = {
          password: await commonHelper.generateNewPassword(payload.newPassword),
          passwordResetToken: null,
        };
        let update = await Services.studentService.updateStudent(
          criteria,
          objToSave
        );
        if (update) {
          return {};
        } else throw Response.error_msg.implementationError;
      } else {
        throw Response.error_msg.implementationError;
      }
    } else {
      throw Response.error_msg.InvalidPasswordToken;
    }
  },
 

  updateStudent: async () => {

  },

 

};
