require('dotenv').config();
const comparePwd = require('../middleware/comparePwd');
const generateToken = require('../middleware/generateToken');
const Admin = require('../models/admin');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });

        if(!admin) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const validPassword = await comparePwd({email, password});
        if (!validPassword) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const token = generateToken(admin);
        res.status(200).json({ message: "Login Successful", token: token, admin: admin });
    } catch (error) {
        res.status(400).json({ error: error.message, });
      };
};

module.exports = login;