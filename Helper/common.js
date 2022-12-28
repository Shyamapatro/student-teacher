var _ = require("underscore");
const crypto = require("crypto");
const algorithm = "aes-256-cbc";
var randomString = require("randomstring");
const bcrypt = require("bcryptjs");
const SaltSounds = 10;

module.exports = {

	generateRandomString: (size, type, capitalization) => {
		if (capitalization) {
			return randomString.generate({ length: size, charSet: type, capitalization: capitalization });
		} else {
			return randomString.generate({ length: size, charSet: type });
		}
	},
	verifyJoiSchema: async(data, schema) => {
		console.log(data)
		const validSchema = await schema.validate(data);
		if ((validSchema) && (validSchema.error)) {
			throw validSchema.error;
		} else {
			
			return validSchema.value;
		}
	},

	generateNewPassword: async(text) => {
		var hash = await bcrypt.hashSync(text, SaltSounds);
		return hash;
	},
	comparePassword: async(text, hash) => {
		var hashCode = await bcrypt.compare(text, hash);
		return hashCode;
	},
	decrypt: async(secretKey) => {
		const decipher = crypto.createDecipher(algorithm, secretKey);
		let dec = decipher.update(secretKey, "hex", "utf8 ");
		dec += decipher.final("utf8");
		return dec;
	},
	encrypt: async(secretKey) => {
		const cipher = crypto.createCipher(algorithm, secretKey);
		let encrypted = cipher.update(secretKey, "utf8", "hex");
		encrypted += cipher.final("hex");
		return encrypted;
	}
};