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
let pendingTimeout = null;
let pendingBlocks = [];

main();

function main() {
  shuffle();
  handleClick();
}

function handleClick() {
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    const front = block.getElementsByClassName("front")[0];
    const value = board[i];

    block.addEventListener("click", async (_, e) => {
      if (pendingTimeout) {
        clearTimeout(pendingTimeout);
        blocks[pendingBlocks[0]].classList.remove("flip");
        blocks[pendingBlocks[1]].classList.remove("flip");
        blocks[pendingBlocks[0]].getElementsByClassName(
          "front",
        )[0].textContent = "";
        blocks[pendingBlocks[1]].getElementsByClassName(
          "front",
        )[0].textContent = "";
        pendingTimeout = null;
        pendingBlocks = [];
      }
      if (stats.has(i)) return;

      if (firstCK === -1) {
        // first click

        front.textContent = value;
        block.classList.add("flip");
        firstCK = i;
      } else {
        // second click

        tries_number++;
        tries.textContent = tries_number;

        front.textContent = value;
        block.classList.add("flip");

        const localFirstCK = firstCK;
        firstCK = -1;

        // atfer select two card
        if (value === board[localFirstCK]) {
          stats.add(i);
          stats.add(localFirstCK);
        } else {
          pendingBlocks = [localFirstCK, i];
          pendingTimeout = setTimeout(() => {
            blocks[localFirstCK].classList.remove("flip");
            blocks[i].classList.remove("flip");
            pendingTimeout = null;
            pendingBlocks = [];
            setTimeout(() => {
              blocks[localFirstCK].getElementsByClassName(
                "front",
              )[0].textContent = "";
              blocks[i].getElementsByClassName("front")[0].textContent = "";
            }, 500);
          }, 1000);
        }
      }
    }); // click
  } // for
} // function

function shuffle() {
  let game_board = [...BASE_CHARS, ...BASE_CHARS];

  for (let i = board.length - 1; i > 1; i--) {
    const ran = Math.floor(Math.random() * i);
    let temp = board[i];
    board[i] = board[ran];
    board[ran] = temp;
  }
}
