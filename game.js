constructBoard = function(height, width){
  var board = new Array(height)
  for(var rowI = 0; rowI < board.length; rowI++){
    board[rowI] = new Array(width)
  }
  return board
}

var board = {
  cells: constructBoard(10, 50)
}

renderBoard = function(){
  var container = document.getElementById('container')
  var allCells = board.cells
  for(var rowI = 0; rowI < allCells.length; rowI++){
    for(var cellI = 0; cellI < allCells[rowI].length; cellI++){
      var cell = document.createElement('div')
      cell.setAttribute('class', 'cell')
      container.appendChild(cell)
    }
  }
}

window.onload = function(){
	renderBoard();
}
