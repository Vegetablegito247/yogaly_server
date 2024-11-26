// config/firebaseConfig.js
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getStorage } = require('firebase-admin/storage');
const serviceAccount = require('../../yogaly-fc596-firebase-adminsdk-iytym-681cc43f32.json');

const app = initializeApp({
  credential: cert(serviceAccount),
  storageBucket: 'lasop-test.appspot.com', // Replace with your actual bucket name
});

// Export the storage instance
const storage = getStorage(app);
module.exports = { storage };