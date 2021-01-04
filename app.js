document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div')
    const scoreDisplay = document.querySelector('span')
    const StartBtn = document.querySelector('button')

    const width = 10
    let currentIndex = 0 //so first div in our grid
    let appleIndex = 0 //so first div in our grid
    let currentSnake = [2,1,0] // so the the div in our grid being 2 (or THE HEAD), and 0 being the end (TAIL, with all 1's being the body from now on)
    let direction = 1
    let score = 0 
    let speed = 0.9
    let intervalTime = 0
    let interval = 0

    //assign function to start and restart the game

    function startGame(){
        currentSnake.forEach(index => squares[index].classList.remove('snake'));
        squares[appleIndex].classList.remove('apple')
        clearInterval(interval)
        score = 0
        //random Apple()
        direction = 1
        scoreDisplay.innerText = score
        intervalTime = 1000
        currentSnake = [2,1,0]
        currentIndex = 0
        currentSnake.forEach(index => squares[index].classList.add('snake'))
        interval = setInterval(moveOutComes, intervalTime)
    }


    // function that deals with All the move outcomes of the snake
    function moveOutComes(){

    // deals with snake hitting border and hitting itself
    if (
       (currentSnake[0] + width >= (width * width) && direction === width) || // if snake hits bottom border
       (currentSnake[0] % width === width -1 && direction === 1) || // if snake hits right border
       (currentSnake[0] % width === 0 && direction === -1) || // if snake hits left border
       (currentSnake[0] - width < 0 && direction === -width) || // if snake hits top border 
       squares[currentSnake[0] + direction].classList.contains('snake') // if snake goes into itself  
    ) {
        return clearInterval(interval) // this will clear the interval if any of the above happens
    }

    const tail = currentSnake.pop() // removes the last item and shows it
    squares[tail].classList.remove('snake') // removes the class of snake from TAIL
    currentSnake.unshift(currentSnake[0] + direction) // gives direction to the head of the array
     
    // deals with snake getting apple
    if(squares[currentSnake[0]].classList.contains('apple')) {
        squares[currentSnake[0]].classList.remove('apple')
        squares[tail].classList.add('snake')
        currentSnake.push(tail)
        randomApple()
        score++
        scoreDisplay.textContent = score
        clearInterval(interval)
        intervalTime = intervalTime * speed
        interval = setInterval(moveOutComes, intervalTime)
    }
    squares[currentSnake[0]].classList.add('snake')

}

    // generate random apple
     
    function randomApple() {
        do{
            appleIndex = Math.floor(Math.random() * squares.length)
        }while(squares[appleIndex].classList.contains('snake')) // making sure apple doesn't pop on the same place
        squares[appleIndex].classList.add('apple')
    }
    
    //assign functions to keycodes
    function control(e){
        squares[currentIndex].classList.remove('snake') //we are removing the class of snake

        if (e.keyCode === 39){
            direction = 1 //if we press the right arrow key snake moves rightwards
        } else if (e.keyCode === 38){
            direction = -width // if we press the up arrow the snake will go back ten divs appearing to go up
        } else if (e.keyCode === 37){
            direction = -1 // if we press left, the snake will go left 1 div
        } else if (e.keyCode === 40){
            direction = +width // if we press down arrow the snake head will instantly appear in the ten divs from where you are now
        }
    }

    document.addEventListener('keyup', control)
    StartBtn.addEventListener('click', startGame)

})
