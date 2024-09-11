const Blogs = require('../models/blog');

const getBlogView = async (req, res) => {
    try {
        const blogId = req.params.id;
        
        const blogView = await Blogs.findById(blogId);

        if(!blogView) {
            return res.status(400).json({
                message: 'Blog not found'
            })
        }

        res.status(200).json({
            message: 'Blog found',
            data: blogView
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    };
}

module.exports = getBlogView;