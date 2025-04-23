let temp = 1;
let win = 0;
let loss = 0;

function compare() {
    let num = Number(document.getElementById("num").value);
    let guess = document.getElementById("guess");
    let computer = document.getElementById("computer");
    let result = document.getElementById("result");
    let result1 = document.getElementById("result1");

    guess.innerHTML = num;

    let computer_num = Math.floor(Math.random() * 10) + 1;
    computer.innerHTML = computer_num;

    if (num === computer_num) {
        result.innerHTML = `You win!`;
        win++;
    } else {
        result.innerHTML = `You lose.`;
        loss++;
    }

    let attemptsRemaining = 5 - temp;
    result1.innerHTML = `Attempts remaining: ${attemptsRemaining}`;

    if (temp === 5) {
        alert(`Your 5 attempts are over. You won ${win} time and lost ${loss} time. Try again!`);
        temp = 1;
        win = 0;
        loss = 0;
        location.reload();
    } else {
        temp++;
    }
}
