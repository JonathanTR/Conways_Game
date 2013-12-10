
constructBoard = function(height, width){
  var board = []
  for(var y = 0; y < height; y++){
    var row = []
    for(var x = 0; x < width; x++){
      row.push(0)
    }
    board.push(row)
  }
  return board
}

var makeAlive = function(){
  this.setAttribute('class','cell alive')
  var y = parseInt(this.getAttribute('data_y'))
  var x = parseInt(this.getAttribute('data_x'))
  conwaysGame.model[y][x] = 1
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
      cell.setAttribute('data_y',y)
      cell.setAttribute('data_x',x)
      cell.addEventListener('click', makeAlive, false)
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
  var modelBoard = conwaysGame.model
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
    if (neighborsArray[i] == 1 ){
      numberOfLivingNeighbors += neighborsArray[i]
    }
  }
  return numberOfLivingNeighbors
}


stepThroughTheBoard = function(){
  var modelBoard = conwaysGame.model
  var viewBoard = conwaysGame.view
  for(var y = 1; y < modelBoard.length - 1; y++){
    for(var x = 1; x < modelBoard[y].length -1; x++){
      var currentViewCell = viewBoard[y][x]
      var neighbors = getNeighbors(y,x)
      var numberOfLivingNeighbors = countLiving(neighbors)
      if(numberOfLivingNeighbors < 2){
        currentViewCell.setAttribute('class','cell')
        conwaysGame.model[y][x] = 0
      }
      else if(numberOfLivingNeighbors == 3){
        currentViewCell.setAttribute('class','cell alive')
        conwaysGame.model[y][x] = 1
      }
      else if(numberOfLivingNeighbors > 3 ){
        currentViewCell.setAttribute('class','cell')
        conwaysGame.model[y][x] = 0
      }
    }
  }
}

var gameTime = function(){
  i = 0
  while( i < 100 ){
    setTimeout(function(){stepThroughTheBoard()}, 200)
    i++
  }
}

var conwaysGame = {
  model: constructBoard(20, 40),
}

window.onload = function(){
  conwaysGame.view = renderBoard();

}
