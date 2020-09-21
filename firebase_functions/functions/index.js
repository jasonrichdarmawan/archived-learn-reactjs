const functions = require("firebase-functions");

const admin = require("firebase-admin");
admin.initializeApp();

function createDocument({ user, data }) {
  console.log("createDocument(), user.uid", user.uid, typeof user.uid);
  admin
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
    .then(console.log("createDocument() DONE"))
    .catch(() => {
      console.log("createDocument() catch()");
      return createDocument({ user, data });
    });
}

exports.createUser = functions
  .region("asia-southeast2")
  .https.onCall((data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "The function must be called " + "while authenticated."
      );
    }

    return admin
      .auth()
      .createUser(data)
      .then((response) => {
        return createDocument({ user: response, data });
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

    if (data.id) {
      return admin
        .firestore()
        .collection(data.collection)
        .doc(data.id)
        .get()
        .then((doc) => {
          if (doc.exists) return [{ id: doc.id, data: doc.data() }];
          else return [];
        })
        .catch((error) => {
          throw new functions.https.HttpsError(error.code, error.message);
        });
    }

    return admin
      .firestore()
      .collection(data.collection)
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
