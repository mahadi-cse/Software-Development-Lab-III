const loadingOverlay = document.getElementById('loadingOverlay');
loadingOverlay.style.display = 'none';

const firebaseConfig = {
    apiKey: "AIzaSyBRf1Z8-AvzM0CpMw3ZscD3NByIq0zLIlc",
    authDomain: "bangladesh-railway-56f4f.firebaseapp.com",
    projectId: "bangladesh-railway-56f4f",
    storageBucket: "bangladesh-railway-56f4f.appspot.com",
    messagingSenderId: "899836438134",
    appId: "1:899836438134:web:be8fa669a8bbfe4b872157",
    measurementId: "G-3PXKK2JKD7"
};

firebase.initializeApp(firebaseConfig);

function registerUser() {
    //   alert('click');

    const name = document.getElementById("name").value;
    const nid = document.getElementById("nid").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Register  

    loadingOverlay.style.display = 'block';

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            const db = firebase.firestore();
            db.collection("UserInfo").doc(email).set({
                name: name,
                nid: nid,
                phone: phone,
                email: email
            })
                .then(() => {
                    window.location.href = "/login";
                })
                .catch((error) => {
                    console.error("Error", error);
                })
                .then(() => {
                    loadingOverlay.style.display = 'none';
                })
        })
        .catch((error) => {
            console.error("Error :", error);
        });

}