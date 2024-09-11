const Blog = require('../models/blog');

const getBlog = async (req, res) => {
    try {
        const blog = await Blog.find();
        res.status(200).json(blog);
    } catch (err) {
        res.status(400).json({ error: err.message });
    };
};

module.exports = getBlog;