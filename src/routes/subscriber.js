const Subscriber = require('../models/subscriber');

const subscribe = async (req, res) => {
    try {
        const { fName, lName, email } = req.body;

        const newUser = new Subscriber({
            fName: fName,
            lName: lName,
            email: email
        });
    
        const savedUser = await newUser.save();
        res.status(200).json({ message: 'Signup successful', data: savedUser });
    } catch (err) {
        res.status(400).json({ error: err.message });
    };
};

module.exports = subscribe;