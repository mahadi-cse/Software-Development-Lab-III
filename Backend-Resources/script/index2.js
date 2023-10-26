const fromInput = document.getElementById('from-input');
const fromSuggestionsElement = document.getElementById('from-suggestions');
const toInput = document.getElementById('to-input');
const toSuggestionsElement = document.getElementById('to-suggestions');
const suggestionBox = document.querySelector('.autocomplete-suggestions');

let stationNames = [];
let fromSelectedIndex = -1;
let toSelectedIndex = -1;

fromInput.addEventListener('input', () => {
    const query = fromInput.value;
    if (query.length > 0) {
        fetchStationNames(query, fromInput, fromSuggestionsElement);
    } else {
        fromSuggestionsElement.innerHTML = '';
        suggestionBox.style.display = 'none';
    }
});

toInput.addEventListener('input', () => {
    const query = toInput.value;
    if (query.length > 0) {
        fetchStationNames(query, toInput, toSuggestionsElement);
    } else {
        toSuggestionsElement.innerHTML = '';
        suggestionBox.style.display = 'none';
    }
});

function fetchStationNames(query, inputElement, suggestionsElement) {
    const filteredNames = stationNames.filter(name => name.toLowerCase().includes(query.toLowerCase()));
    displaySuggestions(filteredNames, inputElement, suggestionsElement);
}

function displaySuggestions(suggestions, inputElement, suggestionsElement) {
    suggestionsElement.innerHTML = '';
    suggestions.forEach((item, index) => {
        const suggestionItem = document.createElement('div');
        suggestionItem.classList.add('autocomplete-suggestion');
        suggestionItem.textContent = item;
        suggestionItem.addEventListener('click', () => {
            inputElement.value = item;
            suggestionsElement.innerHTML = '';
        });
        suggestionsElement.appendChild(suggestionItem);

        suggestionItem.addEventListener('mouseenter', () => {
            if (inputElement === fromInput) {
                fromSelectedIndex = index;
                toSelectedIndex = -1;
            } else if (inputElement === toInput) {
                toSelectedIndex = index;
                fromSelectedIndex = -1;
            }
            updateHighlightedSuggestion(suggestionsElement, suggestions);
        });
    });

    if (suggestions.length > 0) {
        suggestionBox.style.display = 'block';
        updateHighlightedSuggestion(suggestionsElement, suggestions);
    } else {
        suggestionBox.style.display = 'none';
    }
}


function updateHighlightedSuggestion(suggestionsElement, suggestions) {
    const suggestionItems = suggestionsElement.querySelectorAll('.autocomplete-suggestion');
    suggestionItems.forEach((item, index) => {
        if (index === fromSelectedIndex || index === toSelectedIndex) {
            item.classList.add('highlighted');
        } else {
            item.classList.remove('highlighted');
        }
    });
}


fromInput.addEventListener('keydown', (e) => {
    if (suggestionBox.style.display === 'block') {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            fromSelectedIndex = Math.min(fromSelectedIndex + 1, fromSuggestionsElement.children.length - 1);
            updateHighlightedSuggestion(fromSuggestionsElement, stationNames);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            fromSelectedIndex = Math.max(fromSelectedIndex - 1, 0);
            updateHighlightedSuggestion(fromSuggestionsElement, stationNames);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (fromSelectedIndex >= 0) {
                fromInput.value = fromSuggestionsElement.children[fromSelectedIndex].textContent; // Update input with highlighted suggestion
                fromSuggestionsElement.innerHTML = '';
                suggestionBox.style.display = 'none';
            }
        }
    }
});


toInput.addEventListener('keydown', (e) => {
    if (suggestionBox.style.display === 'block') {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            toSelectedIndex = Math.min(toSelectedIndex + 1, toSuggestionsElement.children.length - 1);
            updateHighlightedSuggestion(toSuggestionsElement, stationNames);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            toSelectedIndex = Math.max(toSelectedIndex - 1, 0);
            updateHighlightedSuggestion(toSuggestionsElement, stationNames);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (toSelectedIndex >= 0) {
                toInput.value = toSuggestionsElement.children[toSelectedIndex].textContent; // Update input with highlighted suggestion
                toSuggestionsElement.innerHTML = '';
                suggestionBox.style.display = 'none';
            }
        }
    }
});

fetch('/getStationNames?query=')
    .then(response => response.json())
    .then(data => {
        stationNames = data;
    });



// Date 

const dateInput = document.getElementById('date');


const currentDate = new Date();
const year = currentDate.getFullYear();
let month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
let day = (currentDate.getDate()).toString().padStart(2, '0');

const maxDate = new Date(year, month - 1, parseInt(day) + 11);
const maxYear = maxDate.getFullYear();
let maxMonth = (maxDate.getMonth() + 1).toString().padStart(2, '0');
let maxDay = (maxDate.getDate()).toString().padStart(2, '0');

dateInput.min = `${year}-${month}-${day}`;
dateInput.max = `${maxYear}-${maxMonth}-${maxDay}`;

document.getElementById('logout-link').addEventListener('click', function (e) {
    e.preventDefault();

    // Send a request to the server to log the user out
    fetch('/logout', { method: 'POST' })
        .then(response => {
            if (response.ok) {
                // Successfully logged out, redirect to the home page or perform other actions
                window.location.href = '/';
            } else {
                // Handle logout error
                console.error('Logout failed.');
            }
        })
        .catch(error => {
            console.error('Error during logout request:', error);
        });
});


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

const userEmail = localStorage.getItem('userEmail');

if (userEmail) {
    // Initialize Firestore
    const db = firebase.firestore();

    // Reference the Firestore collection and document
    const userInfoRef = db.collection("UserInfo").doc(userEmail);

    // Get the user's information
    userInfoRef.get()
        .then((doc) => {
            if (doc.exists) {
                const userData = doc.data();
                // Access user's information and update the HTML elements
                document.getElementById("user_email").innerText = userEmail;
                document.getElementById("user_phone").innerHTML = userData.phone;
                document.getElementById("user_name").innerHTML = userData.name;
            } else {
                console.log("No such document!");
            }
        })
        .catch((error) => {
            console.error("Error getting document:", error);
        });
} else {
    console.log('User email not found in local storage.');
}

// Get values from the HTML form


function findTrain() {
    const from = document.getElementById('from-input').value;
    const to = document.getElementById('to-input').value;
    const date = document.getElementById('date').value;
    const selectedClass = document.getElementById('class_select').value;

    localStorage.setItem('from', from);
    localStorage.setItem('to', to);
    localStorage.setItem('date', date);
    localStorage.setItem('selectedClass', selectedClass);


    window.location.href = '/find_train';
}