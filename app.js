const grid = document.querySelector(".grid");
var gBoard;
var gCellIdx = 0;
var numOfNegs;
var isGameover = false
var gBegginer = {
  size: 4,
  bombAmount: 2,
};
var checkedCells = {

};
var size = 4;
var bombAmount = 2;
const BOMB = "bomb";
const VALID = "valid";

const bombs = Array(bombAmount).fill(BOMB);
const valids = Array(size * size - bombAmount).fill(VALID);
const gCells = bombs.concat(valids);

function init() {
  // console.log(gCells)
  createBoard(size);
  console.log(gBoard);
  renderBoard(gBoard);
  setMinesNegsCount(gBoard);
}

function createBoard() {
  const board = [];
  for (var i = 0; i < size; i++) {
    board.push([]);
    for (var j = 0; j < size; j++) {
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
    var counter = 0;
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[i].length; j++) {
      numOfNegs = countNegs(i, j, gBoard);
    //   console.log("numOfNegs", numOfNegs, "i", i, "j", j);
      var elCell = document.getElementById(counter+'');
      elCell.setAttribute("data", numOfNegs);
      counter++
    }
    
  }
  

  return numOfNegs;
}

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


function renderBoard(board){
    var idx = 0;
    var strHtml='';

    for (var i=0; i<size; i++){
        strHtml+= `<tr>`
        for (var j=0; j<size; j++){
            var cell = board[i][j];
            var className = cell.cellType;
            // console.log(className);
            strHtml+= ` <td id="${idx}" class="cell ${className}" onclick="cellClicked(event, this,${i},${j})"></td>`;
            idx++
        }
        
        strHtml+= `</tr>`
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML=strHtml;
}

function cellClicked(eve, elCell, i, j){
    if (isGameover) return
    var cellId = elCell.getAttribute('id').toString();
    console.log('elcell', elCell.getAttribute('id'))
    console.log(checkedCells, i,j)
    if (checkedCells[cellId]) {return}
    checkedCells[cellId]=true;
    console.log(checkedCells, i,j)
    
    if (elCell.classList.contains(BOMB)){
        console.log('game ovaer')
    } else{
        var total = elCell.getAttribute('data');
        console.log(total)
        if (total !=0){
            elCell.classList.add('checked')
            elCell.innerText = total
            return
        }
        checkNegs(i,j,gBoard)
        elCell.classList.add('checked')
    }
}


function checkNegs(cellI, cellJ, board) {
   
    for (var i = cellI - 1; i <= cellI + 1; i++) {
      if (i < 0 || i >= board.length) continue;
      for (var j = cellJ - 1; j <= cellJ + 1; j++) {
        if (j < 0 || j >= board[i].length) continue;
        if (i === cellI && j === cellJ) continue;
        var cellObj= gBoard[i][j];
        var cellId = cellObj.cellIdx
        console.log(cellId)
        var cellElement = document.getElementById(cellId)
        cellClicked(null,cellElement,i,j)
  
        if (board[i][j].cellType === BOMB) minesNegsCount++;
      }
    }
    
  }