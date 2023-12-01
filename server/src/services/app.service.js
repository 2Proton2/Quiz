const userSchema = require('../models/app.model');
const bcrypt = require('bcryptjs');

const AppService = {
  home: () => ({ title: 'home' }),
  createUser: async (ctxt) => {
    try {
      const userInstance = new userSchema(ctxt);
      const result = await userInstance.save();
      return result;
    } catch (error) {
      throw new Error(`Error in registering the user`)
    }
  },
  findOneField: async (field , ctxt) => {
    try {
      const result = await userSchema.findOne({[field]: ctxt});
      return result
    } catch (error) {
      throw new Error(`Error while finding the field`)
    }
  },
  comparePassword: async (userEnt, comparer) => {
    const result = await bcrypt.compare(userEnt, comparer);
    return result;
  }
}

module.exports = AppService;