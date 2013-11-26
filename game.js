
constructBoard = function(height, width){
  var board = new Array(height)
  for(var y = 0; y < board.length; y++){
    board[y] = new Array(width)
  }
  return board
}

renderBoard = function(){
  var container = document.getElementById('container')
  var modelBoard = conwaysGame.model
  var domBoard = []
  for(var y = 0; y < modelBoard.length; y++){
    var domRow = []
    row = document.createElement('div')
    row.setAttribute('class', 'row')
    for(var x = 0; x < modelBoard[y].length; x++){
      var cell = document.createElement('div')
      cell.setAttribute('class', 'cell')
      row.appendChild(cell)
      domRow.push(cell)
    }
    container.appendChild(row)
    domBoard.push(domRow)
  }
  return domBoard
}

var conwaysGame = {
  model: constructBoard(20, 20),
}

window.onload = function(){
	conwaysGame.view = renderBoard();
}
