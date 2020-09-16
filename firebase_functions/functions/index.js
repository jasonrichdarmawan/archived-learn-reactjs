const functions = require("firebase-functions");

const admin = require("firebase-admin");
admin.initializeApp();
exports.createUser = functions
  .region("asia-southeast2")
  .https.onCall((data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "The function must be called " + "while authenticated."
      );
    }

    // question: how to combine promises?
    return admin
      .auth()
      .createUser(data)
      .then((user) => {
        return admin
          .firestore()
          .collection("user")
          .doc(user.uid)
          .set({
            access_rights: {
              administration: data.administration,
              purchase: data.purchase,
              inventory: data.inventory,
              sales: data.sales,
            },
            name: data.displayName,
            email: data.email,
            street: data.street,
            city: data.city,
            zip: data.zip,
            phone: data.phone,
          })
          .catch((error) => {
            throw new functions.https.HttpsError(error.code, error.message);
          });
      })
      .catch((error) => {
        throw new functions.https.HttpsError(error.code, error.message);
      });
  });

exports.fetchFirestore = functions
  .region("asia-southeast2")
  .https.onCall((data, context) => {
    // TODO: admin only.
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "The function must be called " + "while authenticated."
      );
    }

    return admin
      .firestore()
      .collection(data)
      .get()
      .then((querySnapshot) => {
        let array = [];
        querySnapshot.forEach((doc) => {
          array.push({ id: doc.id, data: doc.data() });
        });

        return array;
      })
      .catch((error) => {
        throw new functions.https.HttpsError(error.code, error.message);
      });
  });

const jwt = require("jsonwebtoken");
exports.jwtSign = functions
  .region("asia-southeast2")
  .https.onCall((data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "The function must be called " + "while authenticated."
      );
    }

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
