require('dotenv').config()

const functions = require("firebase-functions");
const app = require("express")();
const admin = require("firebase-admin");

const firebaseConfig = {
    apiKey: process.env.APIKEY,
    databaseURL: process.env.DBURL,
    projectId: process.env.PROJECTID,
  };

admin.initializeApp(firebaseConfig);
const db = admin.firestore();

// POST

app.post("/users", async (req, res) => {
    console.log(process.env);
  try {
    const newUser = {
      ...req.body,
    };

    // Here we connect to our collection FireStore

    const newUserDocument = db.collection("users").doc(`${newUser.name}`);

    // Set new user into collection

    await newUserDocument
      .set(newUser)
      .then(() => res.status(201).send(newUser));
  } catch (error) {
    res.status(500).send(error);
  }
});

//GET

app.get("/users", async (req, res) => {
  try {
    // Here we connect to our collection FireStore and get all values
    const snapshot = await db.collection("users").get(); 
    
    const result = [];
    snapshot.forEach((doc) => {
        let item = doc.data();
        item.id = doc.id;
        result.push(item);
    });
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// DELETE

app.delete("/users/:name", async (req, res) => {
  const { name } = req.params;
  console.log(name);
  await db.collection("users").doc(`${name}`).delete();

  res.status(201).send(`${name} deleted`);
});

exports.app = functions.https.onRequest(app);
