const grid = document.querySelector(".grid");
var gBoard;
var gCellIdx = 0;
var numOfNegs;
var gBegginer = {
    size:4,
    bombAmount:2
}

const BOMB = "bomb";
const VALID = "valid";

const bombs = Array(gBegginer.bombAmount).fill(BOMB);
const valids = Array(gBegginer.size * gBegginer.size - gBegginer.bombAmount).fill(VALID);
const gCells = bombs.concat(valids);

function init() {
  // console.log(gCells)
  createBoard(gBegginer.size);
  // console.log(gBoard);
  renderBoard(gBoard);
  setMinesNegsCount(gBoard);
}

function createBoard() {
  const board = [];
  for (var i = 0; i < gBegginer.size; i++) {
    board.push([]);
    for (var j = 0; j < gBegginer.size; j++) {
      var cell = {
        cellIdx: gCellIdx,
        minesAroundCount: null,
        isShown: false,
        cellType: drawNum(),
        isMarked: true,
      };
      board[i][j] = cell;
      gCellIdx++;
    }
  }
  gBoard = board;
}
// setMinesNegsCount(gBoard);
function setMinesNegsCount(gBoard) {
  //   var elCell = Document.querySelector("td");
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[i].length; j++) {
      numOfNegs = countNegs(i, j, gBoard);
      console.log("numOfNegs", numOfNegs, "i", i, "j", j);

      //   elCell.setAttribute("data", numOfNegs);
    }
  }

  return numOfNegs;
}
console.log(gBoard);
function countNegs(cellI, cellJ, board) {
  var minesNegsCount = 0;
  for (var i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i >= board.length) continue;
    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      if (j < 0 || j >= board[i].length) continue;
      if (i === cellI && j === cellJ) continue;
      // console.log(i,j)

      if (board[i][j].cellType === BOMB) minesNegsCount++;
    }
  }
  return minesNegsCount;
}

function renderBoard() {
  var idx = 0;
  for (var i = 0; i < gBegginer.size; i++) {
    var elRow = document.createElement("tr");
    grid.appendChild(elRow);
    for (var j = 0; j < gBegginer.size; j++) {
      var elCell = document.createElement("td");
      elRow.appendChild(elCell);
      elCell.addEventListener("click", function (e) {
        console.log("click");
      });
      elCell.setAttribute("id", idx);
      elCell.classList.add(gBoard[i][j].cellType);

      idx++;
    }
  }
}
