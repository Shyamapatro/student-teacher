const _ = require("underscore");
const moment = require("moment");
const Joi = require("joi");
const Response = require("../config/response");
let commonHelper = require("../Helper/common");
let Services = require("../services");
let message = require("../config/messages");
let teacherProjection = {"email":1,"firstName":1, "lastName":1,"subject":1,"gender":1};
var ObjectID = require("mongodb").ObjectID;
require("dotenv").config();

module.exports = {
addTeacher: async (payloadData) => {
    console.log(payloadData);
    try {
      const schema = Joi.object().keys({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        subject:Joi.string().required(),
        gender: Joi.string().valid("Male","Female","Others"),

      });

      let payload = await commonHelper.verifyJoiSchema(payloadData, schema);
      console.log("Payload Data", payload);
     
      let condition = {
        email: payload.email,
        isDeleted: 0,
      };


      let checkStudent = await Services.teacherService.getTeacher(condition, {"_id":1,"email":1});
      console.log("checkStudent data", checkStudent);
      if (checkStudent) throw Response.error_msg.alreadyExist;
      let objToSave = {};
      if (_.has(payload, "firstName") && payload.firstName != "")
        objToSave.firstName = payload.firstName;
      if (_.has(payload, "lastName") && payload.lastName != "")
        objToSave.lastName = payload.lastName;
      if (_.has(payload, "email") && payload.email != "")
        objToSave.email = payload.email;
      if (_.has(payload, "subject") && payload.subject != "")
        objToSave.subject = payload.subject;
      if (_.has(payload, "gender") && payload.gender != "")
        objToSave.gender = payload.gender;
      
      let addTeacherData = await Services.teacherService.addTeacher(objToSave);
      if (addTeacherData) {
        return message.success.ADDED
      } else {
        return Response.error_msg.implementationError
      }
    } catch (err) {
      console.log(err)
      throw Response.error_msg.implementationError
    }
  },
getAllTeacher: async () => {
    console.log("getAllTeacher",teacherProjection)
    let getAllTeacherDetails = await Services.teacherService.getAllTeachers(teacherProjection);
    if (getAllTeacherDetails) {
      return getAllTeacherDetails;
    } else {
      throw Response.error_msg.recordNotFound;
    }
  },



deleteTeacher: async (paramData) => {

    let criteria = {
      _id: ObjectID(paramData.id)
    }
    let deleteData = Services.teacherService.deleteTeacher(criteria)
    if (deleteData) {
      return message.success.DELETED
    } else {
      throw Response.error_msg.implementationError
    }
},
};
