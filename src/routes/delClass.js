const Classes = require('../models/classes');

const delClass = async (req, res) => {
    try {
        const classId = req.params.id;

        const deleteClass = await Classes.findByIdAndDelete(classId);
    
        if(!classId) {
            return res.status(404).json({message: 'Class not found'});
        }
        res.status(200).json({message: 'Class deleted successfully', deleteClass});
    } catch (err) {
        res.status(500).json({error: err.message});
    };
};

module.exports = delClass;