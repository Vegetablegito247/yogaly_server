const Classes = require('../models/classes');

const getClass = async (req, res) => {
    try {
        const classes = await Classes.find();
        res.status(200).json(classes);
    } catch (err) {
        res.status(400).json({ error: err.message });
    };
};

module.exports = getClass;