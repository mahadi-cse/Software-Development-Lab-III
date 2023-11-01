const loadingOverlay = document.getElementById('loadingOverlay');
loadingOverlay.style.display = 'block';

const from = localStorage.getItem('from');
const to = localStorage.getItem('to');
const date = localStorage.getItem('date');
const selectedClass = localStorage.getItem('selectedClass');


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

const db = firebase.firestore();
const documentsearch = `${from}-${to}`;
console.log(documentsearch);


// Function that fetch and add data

function populateTrain() {
    const trainContainer = document.getElementById('trainContainer');

    db.collection("FindTrain").doc(documentsearch).collection("TrainsInRoute")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const trainData = doc.data();

                // Create train containers dynamically
                const trainDiv = document.createElement('div');
                trainDiv.className = 'train_container';

                // Add train information
                trainDiv.innerHTML = `
                    <div class="sub_container" style="
    border: 1px solid green;
    background-color: white;
    border-radius: 8px;
    height: fit-content;
    width: 45vw;
    margin-left: 12vw;
    margin-top: 10vh;
    font-family: Roboto;
    box-shadow: #000;
    margin-bottom: 5vh;">
                    <div class="train_name">
                        <h2 class="heading logo-text">${trainData.Name}</h2>
                        <div class="flex">
                            <p class="departure green-text">Departure</p>
                            <p id="heading_arrive" class="departure green-text">Arrive</p>
                        </div>
                        <div class="flex">
                            <p class="departure">${trainData.departureTime}</p>
                            <p class="line"></p>
                            <p id="arrive_time" class="Arrive departure">${trainData.arraivalTime}</p>
                        </div>
                        <div class="flex">
                            <p class="departure">${trainData.From}</p>
                            <p id="heading_arrive" class="departure">${trainData.To}</p>
                        </div>

                        <div class="main_booking">
        <div class="bookings ">
            <div class="class_div bold-text">
                <p style="margin-top: 2px;" class="font-size">AC_B</p>
                <p style="margin-bottom: 2px;
            margin-top: -12px;" class="green-text font-size">৳ ${trainData.priceAC_B} BDT</p>
            </div>
            <div class="available">
                <p class="font-size2">Available Tickets
                    (Counter + Online)</p>
                <p style="margin-top: -8px;" class="bold-text green-text font-size">${Number(trainData.onlineAC_B) + Number(trainData.counterAC_B)}</p>
                <div class="button flex-column">
                <button class="book-now-button " data-class="AC_B">Book Now</button>
                </div>
            </div>
        </div>

        <div class="bookings ">
            <div class="class_div bold-text">
                <p style="margin-top: 2px;" class="font-size">SNIGDHA</p>
                <p style="margin-bottom: 2px;
            margin-top: -12px;" class="green-text font-size">৳ ${trainData.priceSNIGDHA} BDT</p>
            </div>
            <div class="available">
                <p class="font-size2">Available Tickets
                    (Counter + Online)</p>
                <p style="margin-top: -8px;" class="bold-text green-text font-size">${Number(trainData.onlineSNIGDHA) + Number(trainData.counterSNIGDHA)}</p>
                <div class="button flex-column">
                <button class="book-now-button" data-class="SNIGDHA" >Book Now</button>
                </div>
            </div>
        </div>

        <div class="bookings ">
            <div class="class_div bold-text">
                <p style="margin-top: 2px;" class="font-size">S_CHAIR</p>
                <p style="margin-bottom: 2px;
            margin-top: -12px;" class="green-text font-size">৳ ${trainData.priceS_CHAIR} BDT</p>
            </div>
            <div class="available">
                <p class="font-size2">Available Tickets
                    (Counter + Online)</p>
                <p style="margin-top: -8px;" class="bold-text green-text font-size">${Number(trainData.onlineS_CHAIR) + Number(trainData.counterS_CHAIR)}</p>
                <div class="button flex-column">
                <button class="book-now-button" data-class="S_CHAIR">Book Now</button>
                </div>
            </div>
        </div>

                    </div>
                    </div>
                `;

                trainContainer.appendChild(trainDiv);
                const bookNowButtons = trainDiv.querySelectorAll('.book-now-button');
                bookNowButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        const selectedClass = button.getAttribute('data-class');
                        console.log('User clicked on train:', trainData.Name,'+',selectedClass);

                        localStorage.setItem('selectedTrain', trainData.Name);
                        localStorage.setItem('selectedClass', selectedClass);

                        window.location.href = '/booking';
                    });

                });
            });
        })
        .then (()=>{
            loadingOverlay.style.display = 'none';
        })
        .catch((error) => {
            console.error("Error fetching train data: ", error);
        });
}
populateTrain();
