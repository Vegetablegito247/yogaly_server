const Classes = require('../models/classes');
const multer = require('multer');
const { initializeApp } = require("firebase/app");
const { getStorage, ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const firebaseConfig = require('../config/firebaseConfig');

const uploadClass = multer({
    storage: multer.memoryStorage(), // Use memory storage
});

const postClass = async (req, res) => {
    try {
        const { title, description, tutor, time } = req.body;
        const image = req.file;

        const storage = getStorage(app);
        let fileUrl = '';

        if(image) {
            const storageRef = ref(storage, `images/${image.originalname}`);
            const snapshot = await uploadBytes(storageRef, image.buffer);
            fileUrl = await getDownloadURL(snapshot.ref);
        }

        const newClass = new Classes({
            title: title,
            description: description,
            tutor: tutor,
            dateTime: dateTime,
            time: time,
            image: fileUrl
        });

        const savedClass = await newClass.save();
        res.status(200).json({ message: 'Class has been published', data: savedClass });
    } catch (err) {
        res.status(400).json({ error: err.message });
    };
};

module.exports = {postClass, uploadClass};