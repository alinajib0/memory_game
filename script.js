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
}

