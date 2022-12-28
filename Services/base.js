const Response = require("../config/response");

exports.saveData = (payloadData) => {
    // console.log("Collection Name: " + newUserData)
	return new Promise((resolve, reject) => {
	    payloadData.save().then((result) => {
				console.log("data is saved successfully",result)
				resolve(result);
			}).catch((err) => {
				console.log(err);
				reject(Response.error_msg.implementationError);
			});
	});
};


exports.getSingleRecord = (model, criteria, projection) => {
	console.log(`getSingle`,model, criteria, projection)
	return new Promise((resolve, reject) => {
		model.findOne(criteria,projection).then(result => {
			    console.log("promise return ======",result)
				resolve(result);
			}).catch((err) => {
				console.log(err);
				reject(Response.error_msg.implementationError);
			});
	});
};


exports.updateData = (model, criteria, objToSave) => {
	console.log('updateData---=====', model, objToSave,criteria);
	return new Promise((resolve, reject) => {
		model.updateOne(criteria, objToSave)
			.then(result => {
				
				resolve(result);
			}).catch((err) => {
				console.log(err);
				reject(Response.error_msg.implementationError);
			});
	});
};

exports.delete = (model, criteria) => {
	return new Promise((resolve, reject) => {
		model.deleteOne(criteria)
			.then(result => {
				resolve(result);
			}).catch((err) => {
				console.log(err);
				reject(Response.error_msg.implementationError);
			});
	});
};