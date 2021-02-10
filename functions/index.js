const functions = require("firebase-functions");
const app = require("express")();
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

// POST

app.post("/users", async (req, res) => {
  try {
    const newUser = {
      ...req.body,
    };

    // Here we connect to our collection FireStore
    const newUserDocument = db.collection("users").doc(`${newUser.name}`);

    // Set new user into collection
    console.log(newUserDocument);

    await newUserDocument
      .set(newUser)
      .then(() => res.status(201).send(newUser));
  } catch (error) {
    res.status(500).send(error);
  }

  // Response new
});

//GET

app.get("/users", async (req, res) => {
  try {
    // Here we connect to our collection FireStore and get all values
    const snapshot = await db.collection("users").get(); 

    snapshot.forEach((doc) => {
        console.log('DOC!!! ', doc);
      console.log(doc.id, "=>", doc.data());
    });

    res.status(201).send(snapshot);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete("/users/:name", async (req, res) => {
  const { name } = req.params;
  console.log(name);
  await db.collection("users").doc(`${name}`).delete();

  res.status(201).send(`${name} deleted`);
});

exports.app = functions.https.onRequest(app);
