const express = require('express');
const fs = require('fs');
const app = express();


// Firebase Firestore
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountkey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

app.get('/', (req, res) => {
    const index = fs.readFileSync('./html/index.html', 'utf-8');
    res.send(index);
});

// Assuming you have a Firestore collection called 'stations'
const stationsRef = db.collection('SourceDes');


app.get('/getStationNames', async (req, res) => {
    try {
        const snapshot = await admin.firestore().collection('SourceDes').get();
        const documentNames = snapshot.docs.map(doc => doc.id);
        res.json(documentNames);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching document names.' });
    }
});

app.get('/train-info',(req,res)=>{
    const train_info = fs.readFileSync('./html/train-search.html','utf-8')
    res.send(train_info);
})


app.listen(5000, () => {
    console.log('Server listening on port 5000');
});

