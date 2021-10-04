const grid = document.querySelector(".grid")
var gBoard;


var size = 4;
var bombAmount = 2;
const BOMB = "bomb";
const VALID = "valid";

const bombs = Array(bombAmount).fill(BOMB);
const valids = Array(size * size - bombAmount).fill(VALID);
const gCells = bombs.concat(valids);
// console.log(gCells)
createBoard(size)
console.log(gBoard);


function createBoard() {
  const board = [];
  for (var i = 0; i < size; i++) {
    board.push([]);
    for (var j = 0;  j< size; j++) {
      board[i][j] = drawNum()
    }
  }
  gBoard = board
  
}

renderBoard(gBoard)
function renderBoard (){
    var idx=0;
    for (var i=0; i<size; i++){
        var elRow = document.createElement('tr'); 
        grid.appendChild(elRow);
        for (var j=0; j<size; j++){
            var elCell = document.createElement('td');
            elRow.appendChild(elCell);
            elCell.setAttribute('id',idx);
            elCell.classList.add(gBoard[i][j].cellType)
            idx++
        }

    }
}
