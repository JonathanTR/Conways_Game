// New Version of Conway's Game

// MODEL
// INPUT: height and width dimensions
// OUPUT: array of cell objects
// 
// Create Cell Class
//   - should know alive or dead (bool)
//   - should know number of living neighbors (number)
// Create Board Object
//   - should contain an array of cells
//   - should have a method for polling those cells (taking a snapshot)
//   - should have a method for tallying the poll and spitting out alive or dead array
//
// VIEW
// Should have a RenderBoard method
//   - Input: array of living or dead cells
//   - Side Effect: renders cells to page
// 
// CONTROLLER 
// Should have a method to call for first iteration of Board
// Should pass that iteration to the VIEW
// Should call for next iteration of the Board
// Should pass that iteration to the VIEW and so on


// MODEL

Cell = function(){
  this.alive = false
  this.livingNeighbors = 0
}

countLivingNeighbors = function(array, y, x){
  var livingNeighbors = 0
  for(var i = y-1 ; i <= y+1;  i++){
    for(var j = x-1 ; j <= x+1;  j++){
      if( i < 0 || j < 0 || i >= array.length || j >= array[i].length || (i==y && j==x)){
        continue
      }else{
        if(array[i][j].alive){
          livingNeighbors+=1
        }
      }
    }
  }
  return livingNeighbors
}

updateLivingNeighbors = function(){
  var board = conwaysBoard.currentGen
  for(var i = 0 ; i < board.length;  i++){
    for(var j = 0 ; j < board[i].length;  j++){
      board[i][j].livingNeighbors = countLivingNeighbors(board, i, j)
    }
  }
}

var conwaysBoard = {
  currentGen: [],
  rowStuffer: function(width){
    var row = []
    for(var i = 0; i < width; i++){
      row.push(new Cell)
    }
    return row
  },
  init: function(height, width){
    for(var i = 0; i < height; i++){
      this.currentGen.push(this.rowStuffer(width))
    }
  }
}

calculateNextGen = function(){
  var nextGen = []
  var currentGen = conwaysBoard.currentGen
  for(var i = 0 ; i < currentGen.length;  i++){
    var row = []
    for(var j = 0 ; j < currentGen[i].length;  j++){
      var currentCell = currentGen[i][j]
      if(currentCell.livingNeighbors < 2 ){
        row.push(new Cell)
      }
      else if(currentCell.livingNeighbors == 2 && !currentCell.alive){
        row.push(new Cell)
      }
      else if(currentCell.livingNeighbors == 2 && currentCell.alive){
        var cell = new Cell
        cell.alive = true
        row.push(cell)
      }
      else if(currentCell.livingNeighbors == 3){
        var cell = new Cell
        cell.alive = true
        row.push(cell)
      }
      else if(currentCell.livingNeighbors > 3){
        row.push(new Cell)
      }
    }
    nextGen.push(row)
  }
  return nextGen
}

setNewGen = function(){
  conwaysBoard.currentGen = calculateNextGen()
}

nextStep = function(){
  updateLivingNeighbors()
  setNewGen()
  renderBoard()
}

// VIEW

clearBoard = function(){
  document.getElementById('container').innerHTML = ''
}

toggleAlive = function(){
  var y = parseInt(this.getAttribute('data_y'))
  var x = parseInt(this.getAttribute('data_x'))
  thisCell = conwaysBoard.currentGen[y][x]
  if(thisCell.alive){
    thisCell.alive = false
  }
  else{
    thisCell.alive = true
  }
  renderBoard()
}

renderBoard = function(){
  clearBoard()
  var container = document.getElementById('container')
  var modelBoard = conwaysBoard.currentGen
  for(var y = 0; y < modelBoard.length; y++){
    var row = document.createElement('div')
    row.setAttribute('class', 'row')
    for(var x = 0; x < modelBoard[y].length; x++){
      var modelCell = modelBoard[y][x]
      var cell = document.createElement('div')
      cell.setAttribute('data_y',y)
      cell.setAttribute('data_x',x)
      cell.addEventListener('click', toggleAlive, false)
      if(modelCell.alive){
        cell.setAttribute('class','cell alive')
      }else{
        cell.setAttribute('class', 'cell')
      }
      row.appendChild(cell)
    }
    container.appendChild(row)
  }
}

// CONTROLLER

stopConwaysGame = function(){
  clearInterval(gameTime)
}

startConwaysGame = function(){
  gameTime = setInterval(function(){
    nextStep()
  }, 250)
}

window.onload = function(){
  conwaysBoard.init(20,60)
  renderBoard()
  document.getElementById('start').onclick = startConwaysGame
  document.getElementById('stop').onclick = stopConwaysGame
}




