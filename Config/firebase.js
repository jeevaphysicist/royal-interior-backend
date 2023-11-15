// config/firebase.js
const admin = require('firebase-admin');
const serviceAccount = require('../../serviceAccountKey.json'); 

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://contentcreator-ddc7a.appspot.com',
});

const bucket = admin.storage().bucket();

module.exports = { bucket };