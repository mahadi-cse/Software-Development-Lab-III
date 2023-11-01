function populateSeat() {
    const row_container = document.getElementById('row_container');

    for (let index = 2; index < 92; index += 5) {
        const row = document.createElement('div');
        row.className = 'row';
        row.innerHTML = ` <div class="sub_container" style="
        display: flex;
    justify-content: space-between;
        ">
        <div class="left flex">
                <p class="seat">${index}</p>
                <p class="seat">${index + 1}</p>
            </div>
            <div class="right flex">
                <p class="seat">${index + 2}</p>
                <p class="seat">${index + 3}</p>
                <p class="seat">${index + 4}</p>
            </div>
            </div>
    `
        row_container.appendChild(row);
    }

}
populateSeat();

function handleSeatClick(seat) {
    if (seat.style.backgroundColor === 'green') {
        // Deselect the seat and make it white
        seat.style.backgroundColor = 'white';
        seat.style.color = 'black';
    } else {
        // Select the seat and make it green
        seat.style.backgroundColor = 'green';
        seat.style.color = 'white';
    }
}

const seats = document.getElementsByClassName("seat");

for (const seat of seats) {
    seat.addEventListener("click", function () {
        handleSeatClick(seat);
        // alert("Seat " + seat.textContent + " is clicked!");
    });
}