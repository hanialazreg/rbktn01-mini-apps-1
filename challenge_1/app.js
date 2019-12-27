

const game = (() => {
	let gameboard = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  let totalMoves = 0;
// function to switch turn between players
  const turn = () => {
		let temp = player1.turn;
		player1.turn = player2.turn;
		player2.turn = temp;
  };
  const win =() => {
    var gameWon = false;

    // verifiy row
      for (let i = 0; i < 9; i += 3) {
        if (gameboard[i] === gameboard[i + 1] && gameboard[i + 1] === gameboard[i + 2])
          gameWon = true;
      }
      // verify col
      for (let i = 0; i < 3; i++) {
        if (gameboard[i] === gameboard[i + 3] && gameboard[i + 3] === gameboard[i + 6])
          gameWon = true;
      }

      if (gameboard[0] === gameboard[4] && gameboard[4] === gameboard[8])
        gameWon = true;

      if (gameboard[2] === gameboard[4] && gameboard[4] === gameboard[6])
        gameWon = true;

      return gameWon;
    }


   return {gameboard, totalMoves, turn, win }

})();

  // the player class
  const Player = (name, move) => {
    this.name = name;
    this.move = move;
    return {name,move};
  };

  // create the two player
const player1 = Player('Player 1','X');
const player2 = Player('Player 2','O');

for (let i = 0; i < 9; i++) {
  game.gameboard[i] = i + 1;

}

// get all td => table square .
let boxes = document.querySelectorAll('td');

// the reset button .
let newGame = document.querySelector('button');

// setAttribute using to Sets the value of an attribute on the specified element, here we need to set an id to each td
for (let i = 0; i < boxes.length; i++) {
	const element = boxes[i];
  element.setAttribute('id', 'box' + (i + 1).toString(10));

}

//the first move always starts with player X
player1.turn = true;
document.getElementById('player1').setAttribute('class', 'player-on-move');

// create an event listener and that execute a function depends on the game roules
boxes.forEach(box => {
	box.addEventListener('click', () => {
		// if the square is full (contain X or O ) exit
		if(box.innerText === 'X' || box.innerText === 'O')
			return;
    // if it is the palayer 1 turn put the x in the square
		if (player1.turn) {
			box.innerText = player1.move;
      // document.getElementById('player1').removeAttribute('class');
      // document.getElementById('player2').setAttribute('class', 'player-on-move');
      game.turn();

    }

    else {
      console.log("plllllaaayy2",player2.move)
      box.innerText = player2.move;
      console.log("eeellsee",box.innerText)
      // document.getElementById('player2').removeAttribute('class');
      // document.getElementById('player1').setAttribute('class', 'player-on-move');
      game.turn();

    }
    let boxId = box.getAttribute('id')
    console.log("----", boxId)
    let index = boxId.charAt(boxId.length - 1) - 1;
    console.log("hhhhh",index)

    game.gameboard[index] = box.innerText;

    if (game.win()) {
      console.log("wwwwwiiinn",game.win())
			let winnerName;

			if (player1.turn)
				winnerName = player2.name;
			else
				winnerName = player1.name;

			document.querySelector('body').innerHTML += `<h2>${winnerName} wins!</h2>`;
    }
    else {
      // if the game ends without winner
			if(++game.totalMoves === 9) {
				document.querySelector('body').innerHTML += `<h2>It's a tie!</h2>`;
      }
      newGame = document.querySelector('button');
      // reset the game
			newGame.addEventListener('click', () => {
				window.location.reload();
			})

    }
    game.turn();
    console.log("ggggggg",game.turn());

  });
  });

  newGame.addEventListener('click', () => {
    window.location.reload();
  })










