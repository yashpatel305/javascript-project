function playGame(playerMove) {
    const computerMove = pickComputerMove();
    let result = '';

    if (playerMove === 'Scissors') {
      if (computerMove === 'Rock') {
        result = 'You lose!';
      } else if (computerMove === 'Paper') {
        result = 'You win!';
      } else {
        result = "It's a tie!";
      }
    } else if (playerMove === 'Paper') {
      if (computerMove === 'Rock') {
        result = 'You win!';
      } else if (computerMove === 'Paper') {
        result = "It's a tie!";
      } else {
        result = 'You lose!';
      }
    } else if (playerMove === 'Rock') {
      if (computerMove === 'Rock') {
        result = "It's a tie!";
      } else if (computerMove === 'Paper') {
        result = 'You lose!';
      } else {
        result = 'You win!';
      }
    }

    document.getElementById('result').innerHTML = `
      You picked <strong>${playerMove}</strong>, the computer picked <strong>${computerMove}</strong>.<br><br>
      <span style="font-size: 1.6rem;">${result}</span>
    `;
  }

  function pickComputerMove() {
    const randomNumber = Math.random();
    let move = '';

    if (randomNumber < 1 / 3) {
      move = 'Rock';
    } else if (randomNumber < 2 / 3) {
      move = 'Paper';
    } else {
      move = 'Scissors';
    }

    return move;
    }