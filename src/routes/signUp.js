const Admin = require('../models/admin');
const bcrypt = require('bcrypt');

const signUp = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingAdmin = await Admin.findOne({email})

        if(existingAdmin) {
            return res.status(400).json({ error: 'Email is already registered' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPwd = await bcrypt.hash(password, salt);

        const newAdmin = new Admin({
            email: email,
            password: hashedPwd
        });
    
        const savedUser = await newAdmin.save();
        res.status(200).json({ message: 'Signup successful', data: savedUser });
    } catch (err) {
        res.status(400).json({ error: err.message });
    };
};

module.exports = signUp;