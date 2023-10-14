const express = require('express')
const fs = require('fs')
const app = express()


// Firebase Firestore

const { QueryDocumentSnapshot } = require('@google-cloud/firestore');
const { firestore } = require('firebase-admin');
var admin = require('firebase-admin')
var serviceAccount = require('../serviceAccountkey.json')

admin.initializeApp({
    credential : admin.credential.cert(serviceAccount)
});

const db= admin.firestore()
let FirebaseFirestore = db.collection('UserInfo')


// app.get('/', (req, res) => {
//     FirebaseFirestore.get().then((querysnapshot) => {
//         const userData = [];
//         querysnapshot.forEach((document) => {
//             userData.push({
//                 id: document.id,
//                 data: document.data()
//             });
//         });
//         console.log(userData);
//         res.json(userData); // Send the retrieved data and document names as a JSON response
//     });
// });

app.get('/',(req,res)=>{
    const index = fs.readFileSync('./html/index.html', 'utf-8')
    res.send(index);
})

app.listen(5000,()=>{
    console.log('server listening');
})
