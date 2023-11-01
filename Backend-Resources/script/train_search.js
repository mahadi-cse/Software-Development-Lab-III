const loadingOverlay = document.getElementById('loadingOverlay');
loadingOverlay.style.display = 'none';

const trainInput = document.getElementById('train_input');
        const fromSuggestionsElement = document.getElementById('train-suggestions');
        const suggestionBox = document.querySelector('.autocomplete-suggestions');

        let stationNames = [];
        let fromSelectedIndex = -1;

        trainInput.addEventListener('input', () => {
            const query = trainInput.value;
            if (query.length > 0) {
                fetchTrainNames(query, trainInput, fromSuggestionsElement);
            } else {
                fromSuggestionsElement.innerHTML = '';
                suggestionBox.style.display = 'none';
            }
        });

        function fetchTrainNames(query, inputElement, suggestionsElement) {
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
                    fromSelectedIndex = index;
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
                if (index === fromSelectedIndex) {
                    item.classList.add('highlighted');
                } else {
                    item.classList.remove('highlighted');
                }
            });
        }

        trainInput.addEventListener('keydown', (e) => {
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
                        trainInput.value = fromSuggestionsElement.children[fromSelectedIndex].textContent;
                        fromSuggestionsElement.innerHTML = '';
                        suggestionBox.style.display = 'none';
                    }
                }
            }
        });

        fetch('/getTrainNames?query=')
            .then(response => response.json())
            .then(data => {
                stationNames = data;
            });



        const btn = document.getElementById("btn");

        const timeContainer = document.getElementById("timeContainer");

        const p = document.getElementById('right');

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



        btn.addEventListener("click", () => {

            loadingOverlay.style.display = 'block';

            p.style.display = "none";
            timeContainer.style.display = "block";

            const train = document.getElementById('train_input').value;
            // alert(train);

            const db = firebase.firestore()
            
            // Up
            
            const sub_container = document.getElementById('sub_container');

            db.collection('Train').doc(train).collection('up')
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        const upData = doc.data();

                        const upDiv = document.createElement('div');
                        upDiv.className = 'upTime_container';

                        upDiv.innerHTML = `
                        <div 
            style="
            width: 23vw;  
            display: flex;
            justify-content: space-between;
            ">
                            <img src="../img/routes.svg" alt="" height="45px">
                            <p id="staionName">${upData.station}</p>
                            <p id="in">${upData.in}</p>
                            <p id="out">${upData.out}</p>
                        </div>
                        `;

                        sub_container.appendChild(upDiv);
                    })
                })



            // Down

            const sub_container2 = document.getElementById('sub_container2');

            db.collection('Train').doc(train).collection('down')
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        const downData = doc.data();

                        const downDiv = document.createElement('div');
                        downDiv.className = 'downTime_container';

                        downDiv.innerHTML = `
                        <div 
            style="
            width: 23vw;  
            display: flex;
            justify-content: space-between;
            ">
                            <img src="../img/routes.svg" alt="" height="45px">
                            <p id="staionName">${downData.station}</p>
                            <p id="in">${downData.in}</p>
                            <p id="out">${downData.out}</p>
                        </div>
                        `;

                        sub_container2.appendChild(downDiv);
                    })
                    loadingOverlay.style.display = 'none';
                })
        });
