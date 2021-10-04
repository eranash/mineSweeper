function drawNum() {
    var idx = getRandomInt(0, gCells.length-1);
    var num = gCells[idx];
    gCells.splice(idx, 1);
    return num;
  }



function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function countNeighbors(cellI, cellJ, mat) {
    var neighborsCount = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= mat[i].length) continue;
            if (i === cellI && j === cellJ) continue;
            if (mat[i][j] === LIFE || mat[i][j] === SUPER_LIFE) neighborsCount++;
            // if (mat[i][j]) neighborsCount++;
        }
    }
    return neighborsCount;
}