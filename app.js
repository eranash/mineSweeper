const grid = document.querySelector(".grid");
var gBoard;

var size = 4;
var bombAmount = 2;
const BOMB = "bomb";
const VALID = "valid";

const bombs = Array(bombAmount).fill(BOMB);
const valids = Array(size * size - bombAmount).fill(VALID);
const gCells = bombs.concat(valids);
// console.log(gCells)
createBoard(size);
console.log(gBoard);

function createBoard() {
  const board = [];
  for (var i = 0; i < size; i++) {
    board.push([]);
    for (var j = 0; j < size; j++) {
      setMinesNegsCount(i, j, board);
      board[i][j] = drawNum();
    }
  }
  gBoard = board;
}

renderBoard(gBoard);
function renderBoard() {
  var idx = 0;
  for (var i = 0; i < size; i++) {
    var elRow = document.createElement("tr");
    grid.appendChild(elRow);
    for (var j = 0; j < size; j++) {
      var elCell = document.createElement("td");
      elRow.appendChild(elCell);
      elCell.setAttribute("id", idx);
      elCell.classList.add(gBoard[i][j].cellType);
      idx++;
      setMinesNegsCount(i, j, gBoard);
      elCell.setAttribute("data", minesNegsCount);
    }
  }
}


var minesNegsCount = 0;
function setMinesNegsCount(cellI, cellJ, board) {
  for (var i = cellI-1; i <= cellI + 1; i++) {
    if (i < 0 || i >= board.length) continue;
    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      if (j < 0 || j >= board[i].length) continue;
      if (i === cellI && j === cellJ) continue;
      if (board[i][j].cellType === BOMB) minesNegsCount++;
    }
  }
  return minesNegsCount;
}
