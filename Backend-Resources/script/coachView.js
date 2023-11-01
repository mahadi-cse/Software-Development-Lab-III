const loadingOverlay = document.getElementById('loadingOverlay');
loadingOverlay.style.display = 'block';

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
const subContainer = document.getElementById('subContainer');

const db = firebase.firestore();
db.collection('Class')
   .get()
       .then((querySnapshot)=>{
           querySnapshot.forEach((doc)=>{
               const clasData = doc.data();
               
               const classDiv = document.createElement('div');
               classDiv.className = 'class_container';

               classDiv.innerHTML = `
               <div >
                   <div class="mainContent" style="display: inline-block;
    margin-left: 2vw;
   ">

       <div class="content" style=" border-radius: 5px;
       padding: 30px;
       background-color: rgb(245, 245, 245);
       ">
           <img src="${clasData.url}" width="500px">
           <div id="tittle" style="
            display: flex;
   flex-direction: row;
   align-items: center;
           ">
               <p class="boldlogo" style=" color: #DA924E;
               font-size: 20px;
               font-weight: bold;">Tittle : </p>
               <p style="
               margin-left: 10px;
               font-weight: 450;
               ">${clasData.tittle}</p>
           </div>
           <div>
               <p id="capacity" style="
                color: rgb(2, 192, 2);
   font-size: 20px;
   text-align: center;
   margin: -1vh 0;
               ">Capacity</p>
               <div class="flex-between" style=" display: flex;
               justify-content: space-between;
               margin: 0 0vw;">
                   <div>
                       <p style="
                           font-weight: 450;">Meter Gauge</p>
                       <p>${clasData.meter}</p>
                   </div>
                   <div>
                       <p style="
                           font-weight: 450;">Broad Gauge</p>
                       <p>${clasData.broad}</p>
                   </div>
               </div>
           </div>
       </div>

   </div>
               </div>
               
               `;
               subContainer.appendChild(classDiv);
           })
           loadingOverlay.style.display = 'none';
       })

