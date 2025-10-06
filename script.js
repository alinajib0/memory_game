const BASE_CHARS = ["!", "@", "#", "$", "%", "^", "(", "*"];
const tries = document.getElementById("tries_number");
const blocks = [...document.getElementsByClassName("block")];

// "!", "@", "#", "$", "%", "^", "&", "*"
let board = Array(16)
  .fill(0)
  .map((_, idx) => BASE_CHARS[Math.floor(idx / 2)]);
let stats = new Set();
let firstCK = -1;
let tries_number = 0;

main();

function main() {
  shuffle();
}

function shuffle() {
  let game_board = [...BASE_CHARS, ...BASE_CHARS];

  for (let i = board.length - 1; i > 1; i--) {
    const ran = Math.floor(Math.random() * i);
    let temp = board[i];
    board[i] = board[ran];
    board[ran] = temp;
  }
}
