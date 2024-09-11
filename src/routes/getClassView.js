const Class = require('../models/classes');

const getClassView = async (req, res) => {
    try {
        const classId = req.params.id;
        
        const classView = await Class.findById(classId);

        if(!classView) {
            return res.status(400).json({
                message: 'Class not found'
            })
        }

        res.status(200).json({
            message: 'Class found',
            data: classView
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    };
}

module.exports = getClassView;