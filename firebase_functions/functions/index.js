const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const admin = require("firebase-admin");
admin.initializeApp();
exports.createUser = functions
  .region("asia-southeast2")
  .https.onCall((data) => {
    return admin
      .auth()
      .createUser(data)
      .catch((error) => {
        throw new functions.https.HttpsError(error.code, error.message);
      });
  });

const jwt = require("jsonwebtoken");
exports.jwtSign = functions.region("asia-southeast2").https.onCall((data) => {
  return jwt.sign(data, functions.config().public.key);
});
exports.jwtVerify = functions.region("asia-southeast2").https.onCall((data) => {
  return jwt.verify(data, functions.config().public.key);
});
