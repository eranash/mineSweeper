function drawNum() {
    var idx = getRandomInt(0, gCells.length)
    var cell = {
        cellType:gCells[idx],
        minesAroundCount:4,
        isShown:true,
        isMine:false,
        isMarked:true 
    }
    gCells.splice(idx, 1)
    return cell
}



function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}