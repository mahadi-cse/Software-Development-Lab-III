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

function login() {

    loadingOverlay.style.display = 'block';

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    localStorage.setItem('userEmail', email);

    const user = {
        email: email,
        password: password
    };

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            fetch('/setSession', {
                method: 'POST',
                body: JSON.stringify({ user: user }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        window.location.href = "/";
                    }
                    else {
                        alert('Login failed. Check your email and password.');
                    }
                })

                .then(() => {
                    loadingOverlay.style.display = 'none';

                })
                .catch(error => {
                    alert('error occurred ');
                });

        })
        .catch((error) => {
            alert('Login failed. Check your email and password.');
        });

}