// Cache elements
const $boxes = document.querySelectorAll('.box')
const $resetBtn = document.querySelector('#resetBtn')
const $playerX = document.querySelector('#x')
const $playerO = document.querySelector('#o')
const $winningScreen = document.querySelector('#winning-screen')
const $winningText = document.querySelector('#winning-text')
const $replayBtn = document.querySelector('#replayBtn')
const $closeBtn = document.querySelector('#closeBtn')

// Initialize
// We will keep track of some variables in an object, as this is available everywhere
const variables = {
  gameOver: false,
  boardState: [null, null, null, null, null, null, null, null, null]
}

// Determine whose turn it is
// first turn
const selectRandomPlayer = () => {
  const players = ["X", "O"]
  variables.currentPlayer= players[Math.round(Math.random(0, players.length))]
  switch(variables.currentPlayer){
    case "X":
      if(!$playerX.classList.contains("active")) {
        if($playerO.classList.contains("active")){
          $playerO.classList.remove("active")
        }
        $playerX.classList.add("active");
      }
      break;
    case "O":
      if(!$playerO.classList.contains("active")){
        if($playerX.classList.contains("active")) {
          $playerX.classList.remove("active")
        }
        $playerO.classList.add("active");
      }
      break
  }
}

selectRandomPlayer()

// throughout game
const determineCurrentPlayer = () => {
  switch (variables.currentPlayer){
    case "X":
      variables.currentPlayer = "O";
      $playerX.classList.remove("active");
      $playerO.classList.add("active");
      break;
    case "O": 
      variables.currentPlayer = "X";
      $playerO.classList.remove("active");
      $playerX.classList.add("active");
      break;
  }
}

// Make boxes interactive

/* $boxes.forEach((box) => {
  box.innerHTML = "test"
}) */

const addEventListeners = () => {
  $boxes.forEach((box) => {
      box.addEventListener("click", (e) => {
        if(!variables.gameOver){
          const id = e.currentTarget.dataset.id;
          if(variables.boardState[id] === null) {
            box.innerHTML = `<span class="input">${variables.currentPlayer}</span>`
            variables.boardState[id] = variables.currentPlayer;
            if(checkWin()){
              anounceWinner();
              variables.gameOver= true
            };
            if(variables.boardState.every(element => element !== null)){
              gameOver()
            }
            determineCurrentPlayer()
          }
        }})
    }
  )
}

addEventListeners()

// Determine winner (inspired by ChatGPT)
const winningCombinations = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left column
  [1, 4, 7], // middle column
  [2, 5, 8], // right column
  [0, 4, 8], // diagonal from top left to bottom right
  [2, 4, 6], // diagonal from top right to bottom left
];

const checkWin = () => {
  return winningCombinations.some(combination => {
    return combination.every(index => variables.boardState[index] === variables.currentPlayer)
  })
}

const anounceWinner = () => {
  $winningText.innerHTML = `<span>Congrats Player ${variables.currentPlayer}</span>!`
  $winningScreen.classList.remove("hidden");
}

const gameOver = () => {
  $winningText.innerHTML = "Game Over";
  $winningScreen.classList.remove("hidden")
}

// Restart game
const restartGame = () => {
  selectRandomPlayer();
  variables.boardState = [null, null, null, null, null, null, null, null, null];
  variables.gameOver = false
  $boxes.forEach( (box) => {
    box.innerHTML = ""
  })
  $winningScreen.classList.add("hidden")
}

// Reset button
$resetBtn.addEventListener("click", () => {
  restartGame()
})

// Play again button
$replayBtn.addEventListener("click", () => {
  restartGame()
})

// Close button
$closeBtn.addEventListener("click", () => {
  $winningScreen.classList.add("hidden")
})