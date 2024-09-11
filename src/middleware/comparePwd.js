const Admin = require('../models/admin');
const bcrypt = require('bcrypt');

const comparePwd = async (admin) => {
    try {
        const user = await Admin.findOne({ email: admin.email }).select('+password');
        
        if(!user) {
            throw new Error('No admin found');
        }

        return await bcrypt.compare(admin.password, user.password);
    } catch (error) {
        throw new Error(error);
      }
};

module.exports = comparePwd;