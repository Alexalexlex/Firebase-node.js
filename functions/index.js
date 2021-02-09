const functions = require("firebase-functions");
const app = require("express")();
const admin = require('firebase-admin');

admin.initializeApp();
const db = admin.firestore();

const docRef = db.collection('users').doc('alovelace');

const userSet = async() => {
await docRef.set({
  first: 'Ada',
  last: 'Lovelace',
  born: 1815
});

const aTuringRef = db.collection('users').doc('aturing');

await aTuringRef.set({
  'first': 'Alan',
  'middle': 'Mathison',
  'last': 'Turing',
  'born': 1912
});
}

userSet()

app.get("/app", async (req,res) => {
    const snapshot = await db.collection('users').get();
    snapshot.forEach((doc) => {
    console.log(doc.id, '=>', doc.data());
});
})

exports.app = functions.https.onRequest(app)