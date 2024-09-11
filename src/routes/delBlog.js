const Blog = require('../models/blog');

const delBlog = async (req, res) => {
    try {
        const blogId = req.params.id;

        const deleteBlog = await Blog.findByIdAndDelete(blogId);

        if(!blogId) {
            return res.status(404).json({ message: 'No blog found' });
        }
        res.status(200).json({ message: 'Blog deleted successfully', deleteBlog });
    } catch (err) {
        res.status(500).json({ message: err.message });
    };
};

module.exports = delBlog;