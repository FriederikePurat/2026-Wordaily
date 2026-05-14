const solution = "PICKLEBALL";
const wordLength = 10;
const maxRows = 6;

let currentRow = 0;
let currentCol = 0;

const tiles = document.querySelectorAll(".wordle-tile");
const keys = document.querySelectorAll(".wordle-key");
const deleteKey = document.getElementById("delete-key");
const enterKey = document.getElementById("enter-key");

keys.forEach(function (key) {

    key.addEventListener("click", function () {

        if (key.id === "delete-key" || key.id === "enter-key") {
            return;
        }

        if (currentCol < wordLength) {

            const index =
                currentRow * wordLength + currentCol;

            tiles[index].textContent =
                key.textContent.trim();

            currentCol++;
        }

    });

});

deleteKey.addEventListener("click", function () {

    if (currentCol > 0) {

        currentCol--;

        const index =
            currentRow * wordLength + currentCol;

        tiles[index].textContent = "";
    }

});

enterKey.addEventListener("click", function () {

    if (currentCol < wordLength) {
        alert("Du brauchst 10 Buchstaben.");
        return;
    }

    checkRow();

    const guess = getCurrentGuess();

    // GEWONNEN
    if (guess === solution) {

        setTimeout(function () {

            window.location.href = "glueckwunsch.html";

        }, 1200);

        return;
    }

    currentRow++;
    currentCol = 0;

    // VERLOREN
    if (currentRow >= maxRows) {

        setTimeout(function () {

            window.location.href = "verloren.html";

        }, 1200);

    }

});

function getCurrentGuess() {

    let guess = "";

    for (let i = 0; i < wordLength; i++) {

        const index =
            currentRow * wordLength + i;

        guess += tiles[index].textContent;
    }

    return guess;
}

function checkRow() {

    const guess = getCurrentGuess();
    const result = Array(wordLength).fill("wrong");

    // Erst grün prüfen
    for (let i = 0; i < wordLength; i++) {

        if (guess[i] === solution[i]) {
            result[i] = "correct";
        }

    }

    // Dann gelb prüfen
    for (let i = 0; i < wordLength; i++) {

        if (result[i] === "correct") {
            continue;
        }

        if (solution.includes(guess[i])) {
            result[i] = "wrong-position";
        }

    }

    // Farben setzen
    for (let i = 0; i < wordLength; i++) {

        const tileIndex = currentRow * wordLength + i;

        tiles[tileIndex].classList.add(result[i]);

        colorKeyboardKey(guess[i], result[i]);
    }
}

function colorKeyboardKey(letter, status) {

    keys.forEach(function (key) {

        if (key.textContent.trim() === letter) {

            if (key.classList.contains("correct")) {
                return;
            }

            if (
                key.classList.contains("wrong-position")
                && status === "wrong"
            ) {
                return;
            }

            key.classList.remove(
                "wrong",
                "wrong-position",
                "correct"
            );

            key.classList.add(status);
        }

    });

}