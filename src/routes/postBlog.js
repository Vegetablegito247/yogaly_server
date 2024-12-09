const Blog = require('../models/blog');
const multer = require('multer');
const { storage } = require('../config/firebaseConfig');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const upload = multer({
    storage: multer.memoryStorage(), // Use memory storage
});

const postBlog = async (req, res) => {
    try {
        const { title, summary, content, author } = req.body;
        const image = req.file;

        if(!image) {
            return res.status(400).json({ error: 'No Image file uploaded.' });
        }

        const bucket = storage.bucket();
        const file = bucket.file(`images/${encodeURIComponent(image.originalname)}`);

        // Create a write stream to upload the file
        const stream = file.createWriteStream({
            metadata: {
                contentType: image.mimetype,
            },
        });

        stream.on('error', (err) => {
            return res.status(500).json({ error: 'Failed to upload file', details: err.message });
        });

        stream.on('finish', async () => {
            // Get the public URL of the uploaded file
            const fileUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(file.name)}?alt=media`;

            // Create the certificate document with the correct URL
            const blogData = await Blog.create({
                title,
                summary,
                content,
                author,
                image: fileUrl
            });

            res.status(201).json({
                message: 'Classes created successfully',
                data: blogData
            });
        });

        // Write the file buffer to the storage
        stream.end(image.buffer);
    } catch (err) {
        res.status(400).json({ error: err.message });
    };
};

module.exports = { postBlog, upload };