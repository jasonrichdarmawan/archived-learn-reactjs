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
const { decode } = require("firebase-functions/lib/providers/https");
exports.jwtSign = functions.region("asia-southeast2").https.onCall((data) => {
  return jwt.sign(data, functions.config().public.key);
});
const _ = require("lodash");
exports.jwtVerify = functions
  .region("asia-southeast2")
  .https.onCall((data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "The function must be called " + "while authenticated."
      );
    }
    const uid = context.auth.uid;

    let decoded;
    try {
      decoded = jwt.verify(data, functions.config().public.key);
    } catch (err) {
      throw new functions.https.HttpsError(
        "permission-denied",
        "user's document is not signed properly."
      );
    }

    return admin
      .firestore()
      .collection("user")
      .doc(uid)
      .get()
      .then((doc) => {
        if (!doc.exists) {
          throw new functions.https.HttpsError(
            "not-found",
            "user's document is not found."
          );
        } else if (!_.isEqual(doc.data(), decoded.document)) {
          throw new functions.https.HttpsError(
            "unauthenticated",
            "user's document is not signed properly"
          );
        }
        return decoded;
      })
      .catch((error) => {
        throw new functions.https.HttpsError(error);
      });
  });
