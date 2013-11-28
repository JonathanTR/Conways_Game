
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

// y-1, x-1  y-1, x  y-1, x+1
// y, x-1    y,x     y, x+1
// y+1, x-1  y+1, x  y+1,x+1

var getNeighbors = function(y, x){
  var modelBoard = conwaysGame.view
  var neighbors = []
  neighbors.push(modelBoard[y-1][x-1],
                 modelBoard[y-1][x],
                 modelBoard[y-1][x+1],
                 modelBoard[y][x+1],
                 modelBoard[y+1][x+1],
                 modelBoard[y+1][x],
                 modelBoard[y+1][x-1],
                 modelBoard[y][x-1]
                 )
  return neighbors
}

var countLiving = function(neighborsArray){
  var numberOfLivingNeighbors = 0
  for(var i = 0; i < neighborsArray.length; i++){
    console.log(neighborsArray[i])
    if(neighborsArray[i].classList.contains('alive')){
      numberOfLivingNeighbors += 1
    }
  }
  return numberOfLivingNeighbors
}


boardStepper = function(){
  for(var y = 0; y < modelBoard.length; y++){
    for(var x = 0; x < modelBoard[y].length; x++){
      currentCell = modelBoard[y][x]
      neighbors = getNeighbors(y,x)
      livingNeighbors = countLiving(neighbors)
    }
  }
}


var conwaysGame = {
  model: constructBoard(20, 40),
}

window.onload = function(){
	conwaysGame.view = renderBoard();
}
