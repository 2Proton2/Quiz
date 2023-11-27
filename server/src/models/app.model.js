const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

let appSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: (value) => {
          const mailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if(!mailPattern.test(value)){
            throw new Error("Email Validation Failed");
          }
        },
        message: 'Please enter a correct mail id'
      }
    },
    profilePicture: {
      type: String,
      required : true
    },
    birthdate: {
      type: Date,
      required: true,
      default: Date.now()
    },
    phoneNumber: {
      type: String,
      required: ['true', 'User phone number required'],
      validate: {
        validator: (value) => {
          const phoneValidation = /^[6-9]\d{9}$/
          if(!phoneValidation.test(value)){
            throw new Error(`Enter a valid phone nuber with country code`)
          }
        }, 
        message: 'Enter a valid phone number'
      }
    },
    password: {
      type: String,
      required: true
    },
  },
  {
    collection: "user",
    timestamps: true,
    strict: false,
  }
);

/**
 * Hash the password
 */
appSchema.pre('save', async function(next){
  if(this.isModified('password')){
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
})
module.exports = mongoose.model("appSchema", appSchema);
