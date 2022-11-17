document.addEventListener('DOMContentLoaded', () => {


const userGrid = document.querySelector('.grid-user')
    
const computerGrid = document.querySelector('.grid-computer')
    
const displayGrid = document.querySelector('.grid-display')

const ships = document.querySelectorAll('.ship')

const destroyer = document.querySelector('.destroyer-container')

const submarine = document.querySelector('.submarine-container')

const cruiser = document.querySelector('.cruiser-container')

const battleship = document.querySelector('.battleship-container')

const carrier = document.querySelector('.carrier-container')

const startButton = document.querySelector('#start')

const rotateButton = document.querySelector('#rotate')

const turnDisplay = document.querySelector('#whose-go')

const infoDisplay = document.querySelector('#info')

const setupButtons = document.getElementById('setup-buttons')

const userSquares = []

const computerSquares = []


let isGameOver = false

let currentPlayer = 'user'

const width = 10

let playerNum = 0

let ready = false

let enemyReady = false

let allShipsPlaced = false

let shotFired = -1













//Ships 
// This is my Ships Array that I am creating for each ship thats in the game. 

const shipArray = [
    {
      name: 'destroyer',
      directions: [
        [0, 1],
        [0, width]
      ]
    },
    {
      name: 'submarine',
      directions: [
        [0, 1, 2],
        [0, width, width*2]
      ]
    },
    {
      name: 'cruiser',
      directions: [
        [0, 1, 2],
        [0, width, width*2]
      ]
    },
    {
      name: 'battleship',
      directions: [
        [0, 1, 2, 3],
        [0, width, width*2, width*3]
      ]
    },
    {
      name: 'carrier',
      directions: [
        [0, 1, 2, 3, 4],
        [0, width, width*2, width*3, width*4]
      ]
    },
  ]
  // this is my userboard for all my ships to be placed 
  createBoard(userGrid, userSquares)
  // this is the computer board so I can attack all the enemies 
  createBoard(computerGrid, computerSquares)

startGame()
playGameSingle()
  
// Ready button click
startButton.addEventListener('click', () => {
    // if(allShipsPlaced)
    //  playGameMulti(socket)
    // else infoDisplay.innerHTML = "Please place all ships"
  })


function createBoard(grid, squares) {
    // why would i make width * width? well the reason behind it is because I am creating a grid with the total value of 1000 since width = 10
    for (let i = 0; i < width*width; i++) {
      const square = document.createElement('div')
      square.dataset.id = i
      grid.appendChild(square)
      squares.push(square)
    }
  }

  

function startGame() {
    generateEnemy(shipArray[0])
    generateEnemy(shipArray[1])
    generateEnemy(shipArray[2])
    generateEnemy(shipArray[3])
    generateEnemy(shipArray[4])

    startButton.addEventListener('click', () => {
        setupButtons.style.display = 'none'
        startGame()
      })
    }


    function playGameSingle() {
        if (isGameOver) return
        if (currentPlayer === 'user') {
        //   turnDisplay.innerHTML ="Your Turn"
          computerSquares.forEach(square => square.addEventListener('click', function(e) {
            shotFired = square.dataset.id
            userAttack(square.classList)
          }))
        }
        if (currentPlayer === 'enemy') {
        //   turnDisplay.innerHTML ="Computers Turn"
          setTimeout(enemyAttack, 1000)
        }
      }


    // this is my function to generate the enemy's ship in random positions on the enemies board
    function generateEnemy(ship) {
        let randomDirection = Math.floor(Math.random() * ship.directions.length)
        let current = ship.directions[randomDirection]
        if (randomDirection === 0) direction = 1
        if (randomDirection === 1) direction = 10
        // Math.abs is giving me the absolute value of the number.
        // So what randomStart is equaling the the absolute value of math.random which should give me a number anywhere between 0 to 1  multipling the computers squares length which i define earlier as the value of 10. so if the random number for example is .76 it will generate the 
        let randomStart = Math.abs(Math.floor(Math.random() * computerSquares.length - (ship.directions[0].length * direction)))
    
        const isTaken = current.some(index => computerSquares[randomStart + index].classList.contains('taken'))
        const isAtRightEdge = current.some(index => (randomStart + index) % width === width - 1)
        const isAtLeftEdge = current.some(index => (randomStart + index) % width === 0)
    
        if (!isTaken && !isAtRightEdge && !isAtLeftEdge) current.forEach(index => computerSquares[randomStart + index].classList.add('taken', ship.name))
    
        else generateEnemy(ship)
      }
      
    
  


// these let statements are here so I can identify how many hit points it lost.     
let userDestroyerCount = 0

let userSubmarineCount = 0

let userCruiserCount = 0

let userBattleshipCount = 0

let userCarrierCount = 0






// this is my function to call on when the user wants to attack the CPU ships 
function userAttack(classList) {
    const enemySquare = computerGrid.querySelector(`div[data-id='${shotFired}']`)
    const obj = Object.values(classList)
    if (!enemySquare.classList.contains('hit') && currentPlayer === 'user' && !isGameOver) {
      if (obj.includes('destroyer')) cpuDestroyerCount++
      if (obj.includes('submarine')) cpuSubmarineCount++
      if (obj.includes('cruiser')) cpuCruiserCount++
      if (obj.includes('battleship')) cpuBattleshipCount++
      if (obj.includes('carrier')) cpuCarrierCount++
    }
    if (obj.includes('taken')) {
      enemySquare.classList.add('hit')
    } else {
      enemySquare.classList.add('miss')
    }
    // checkForWins()
    currentPlayer = 'enemy'
     playGameSingle()
  }

let cpuDestroyerCount = 0
  
let cpuSubmarineCount = 0

let cpuCruiserCount = 0

let cpuBattleshipCount = 0

let cpuCarrierCount = 0





// function enemyAttack(square) {
//      square = Math.floor(Math.random() * userSquares.length)
//     if (!userSquares[square].classList.contains('Player hit')) {
//       const hit = userSquares[square].classList.contains('taken')
//       userSquares[square].classList.add(hit ? 'Player hit' : 'miss')
//       if (userSquares[square].classList.contains('destroyer')) userDestroyerCount++
//       if (userSquares[square].classList.contains('submarine')) userSubmarineCount++
//       if (userSquares[square].classList.contains('cruiser')) userCruiserCount++
//       if (userSquares[square].classList.contains('battleship')) userBattleshipCount++
//       if (userSquares[square].classList.contains('carrier')) userCarrierCount++
//     //   checkForWins()
//     } else if (gameMode === 'singlePlayer') enemyAttack()
//     currentPlayer = 'user'
//     // turnDisplay.innerHTML = 'Your Go'
//   }







})
