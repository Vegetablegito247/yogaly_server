const Blog = require('../models/blog');
const multer = require('multer');
const { initializeApp } = require("firebase/app");
const { getStorage, ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const firebaseConfig = require('../config/firebaseConfig');

const app = initializeApp(firebaseConfig);

const upload = multer({
    storage: multer.memoryStorage(), // Use memory storage
});

const postBlog = async (req, res) => {
    try {
        const { title, summary, content, author } = req.body;
        const image = req.file;

        const storage = getStorage(app);
        let fileUrl = '';

        if(image) {
            const storageRef = ref(storage, `images/${image.originalname}`);
            const snapshot = await uploadBytes(storageRef, image.buffer);
            fileUrl = await getDownloadURL(snapshot.ref);
        }

        const newBlog = new Blog({
            title: title,
            summary: summary,
            content: content,
            author: author,
            image: fileUrl
        });
    
        const savedBlog = await newBlog.save();
    
        res.status(200).json({ message: 'Blog has been published', data: savedBlog });
    } catch (err) {
        res.status(400).json({ error: err.message });
    };
};

module.exports = { postBlog, upload };