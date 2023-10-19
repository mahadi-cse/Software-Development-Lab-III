const express = require('express');
const fs = require('fs');
const app = express();


// Firebase Firestore

const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountkey.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});



//  URL Ussage 


app.get('/', (req, res) => {
    const index = fs.readFileSync('./html/index.html', 'utf-8');
    res.send(index);
});


app.get('/train-info',(req,res)=>{
    const train_info = fs.readFileSync('./html/train-search.html','utf-8')
    res.send(train_info)
});    
    

// Backend

app.get('/getStationNames', async (req, res) => {
    try {
        const snapshot = await admin.firestore().collection('SourceDes').get();
        const documentNames = snapshot.docs.map(doc => doc.id);
        res.json(documentNames);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching document names.' });
    }
});

app.get('/getTrainsName', async (req, res) => {
    try {
        const snapshot = await admin.firestore().collection('Train').get();
        const documentNames = snapshot.docs.map(doc => doc.id);
        res.json(documentNames);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching document names.' });
    }
});


// Testing

app.get('/test', (req, res) => {
    const test = fs.readFileSync('./html/test.html', 'utf-8');
    res.send(test);
});


app.get('/*', (req, res) => {
    res.status(404).send("<h1>404 Not Found </h1> <a href='/'>Go back home </h1>");
});


app.listen(5000, () => {
    console.log('Server listening on port 5000');
});