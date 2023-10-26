const express = require('express');
const fs = require('fs');
const session = require('express-session');
const app = express();

// Firebase
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountkey.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});


// Use section

app.use(session({
    secret: 'your-secret-key',
    resave: true,
    saveUninitialized: false,
}));

app.use(express.json());

app.use((req, res, next) => {
    if (req.session && req.session.user) {
        // User is logged in
        res.locals.user = req.session.user;
    } else {
        res.locals.user = null;
    }
    next();
});

app.post('/setSession', (req, res) => {
    if (req.body.user) {
        req.session.user = req.body.user;
        req.session.isLoggedIn = true;
        res.json({ success: true });
        console.log(req.body.user);
    } else {
        res.json({ success: false });
    }
});

app.use(express.static(__dirname+'/Backend-Resources/'));



// URL Usage

app.get('/', (req, res) => {
    if (res.locals.user) {
        const index2 = fs.readFileSync('./Application/index2.html', 'utf-8');
        res.send(index2);
    } else {
        const index = fs.readFileSync('./Application/index.html', 'utf-8');
        res.send(index);
    }
});

app.get('/train-info', (req, res) => {
    const train_info = fs.readFileSync('./Application/train-search.html', 'utf-8');
    res.send(train_info);
});

app.get('/login', (req, res) => {
    const login = fs.readFileSync('./Application/login.html', 'utf-8');
    res.send(login);
});


app.post('/logout', (req, res) => {

    req.session.destroy((err) => {
        if (err) {
            console.error('Session destroy error:', err);
        }
        res.sendStatus(200);
    });
});

app.get('/login', (req, res) => {
    const login = fs.readFileSync('./Application/login.html', 'utf-8');
    res.send(login);
});
app.get('/register', (req, res) => {
    const register = fs.readFileSync('./Application/register.html', 'utf-8');
    res.send(register);
});

app.get('/find_train', (req, res) => {
    if (res.locals.user) {
        const find_train2 = fs.readFileSync('./Application/find_train2.html', 'utf-8');
        res.send(find_train2);
    } else {
        const find_train = fs.readFileSync('./Application/find_train.html', 'utf-8');
        res.send(find_train);
    }
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

app.get('/getTrainNames', async (req, res) => {
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


// Last

app.get('/*', (req, res) => {
    res.status(404).send("<h1>404 Not Found</h1> <a href='/'>Go back home</a>");
});


app.listen(5000, () => {
    console.log('Server listening on port 5000');
});
