
let gameStart = false;
// @initianilize colisions and score
let colisions = 0;
let score=0;
// -- draw hearts
hearts();
//get elements
const modal = document.getElementById('myModal');
const m_content = document.querySelector('.modal-content');
const m_contentWin = document.querySelector('.modal-content-win');
const m_contentLoose = document.querySelector('.modal-content-loose');
const btn = document.getElementById("myBtn");
const btn1 = document.getElementById("myBtn1");
const btn2 = document.getElementById("myBtn2");
restartGame();
//start timer event listener
document.getElementById("myBtn").addEventListener("click", startTimer);
//-- modal control at start
if(gameStart === true){      
                modal.style.display = "none";
                
            }
        else {
                modal.style.display = "block";                
                m_contentWin.style.display = "none";
                m_contentLoose.style.display = "none";
          }

// Enemies our player must avoid
let Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started


    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.speedX = 2;
    this.sprite = 'images/enemy-bug.png';
    this.update();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speedX * Math.random();
    if (this.x > 505) {
        this.x = -100;
        this.speedX = Math.floor(Math.random() * 2 + 1);
    }


//Check if collision between player and enemy happen
   
        if ((player.x < this.x + 70 && player.x + 50 > this.x) && (player.y < this.y + 40 && player.y + 40 > this.y)) {
            ++colisions; // indent collisions
            hearts();
            player.reset();            
        }
   
//-- if Player reachs the water goes back to initial position
    if(player.y < 30) {
       score += 1;
       hearts();
       setTimeout(function () { // -- delay reset player
       player.reset();
    }, 410);
//-- wineer modal open       
    if(score > 2900){      
                setTimeout(function () { // -- delay modal open
       modal.style.display = "block"; 
                m_contentWin.style.display = "block";               
                stop();
    document.getElementById("score").textContent = `You reach ${score} points`
    document.getElementById("time").textContent = `Your time was ${h4.textContent} minutes`
    }, 600);


}
  }
// -- looser modal open  
  if(colisions === 3){      
                modal.style.display = "block"; 
                m_contentLoose.style.display = "block";               
                stop();
}
  
};

 
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = function () {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = 300;
    this.y = 400;
    this.sprite = 'images/char-boy.png';
    this.update();
    this.handleInput();
};


Player.prototype.update = function () {};

Player.prototype.render = function () {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.reset = function () {
    this.x = 300;
    this.y = 400;
};

Player.prototype.handleInput = function (key) {

    if (key == 'left' && this.x > 0) {
        this.x -= 100;
    }
    if (key == 'up' && this.y > 0) {
        this.y -= 90;
    }
    if (key == 'right' && this.x < 350) {
        this.x += 100;
    }
    if (key == 'down' && this.y < 400) {
        this.y -= -90;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let player = new Player();
let enemy1 = new Enemy(-100, 70);
let enemy2 = new Enemy(-200, 225);
let enemy3 = new Enemy(-50, 140);
let enemy4 = new Enemy(-600, 220);
let allEnemies = [enemy1, enemy2, enemy3, enemy4];


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// -- Restart game
function restartGame() {  
   btn.onclick = () => {
        gameStart = true;
        modal.style.display = "none";
        m_content.style.display="none";
        m_contentWin.style.display="none";        
    }  

    btn1.onclick = () => {
        gameStart = true;
        modal.style.display = "none";
        m_content.style.display="none";
        m_contentWin.style.display="none";               
    }
    btn2.onclick = () => {
        gameStart = true;
        modal.style.display = "none";
        m_content.style.display="none";
        m_contentWin.style.display="none";               
    }   
};

//select player
const choosePlayer = (selection) => {
    switch(selection){
        case "boy": 
            player.sprite = 'images/char-boy.png';
            break; 
            case "cat":
            player.sprite = 'images/char-cat-girl.png';
            break;
            case "horn":
            player.sprite = 'images/char-horn-girl.png';
            break;
            case "pink":
            player.sprite = 'images/char-pink-girl.png';
            break;
            case "princess":
            player.sprite = 'images/char-princess-girl.png';
            break;
    }
}

// @manage hearts in game
function hearts() {
    document.querySelector(".score").textContent = `${score}`; 
    //@index modal with number of colisions
    if (colisions === 0) { //@for colisions less than 25 disply 3 stars
        document.querySelector(".heart1").classList.add("fas", "fa-heart");
        document.querySelector(".heart2").classList.add("fas", "fa-heart");
        document.querySelector(".heart3").classList.add("fas", "fa-heart");
    } else if (colisions === 1) {
         // after 25 colisions decrement a star
        document.querySelector(".heart3").classList.remove("fas", "fa-heart");
        document.querySelector(".heart3").classList.add("far", "fa-heart");
   
    } else if (colisions === 2) { //@for colisions les than 35 disply 1 star
        document.querySelector(".heart2").classList.remove("fas", "fa-heart");
        document.querySelector(".heart2").classList.add("far", "fa-heart");
       
    } else if (colisions === 3) { //@for colisions les than 35 disply 1 star
        document.querySelector(".heart1").classList.remove("fas", "fa-heart");
        document.querySelector(".heart1").classList.add("far", "fa-heart");
    }
};

// @Timer script
var h4 = document.getElementsByTagName('h4')[0],
    seconds = 0,
    minutes = 0,
    t; // initialize time on html
// @ function start timer
function startTimer() { 
   document.getElementById("myBtn").removeEventListener('click', startTimer);
       
    function add() {
        seconds++;
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
        }

        h4.textContent = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
        timer();

    }

    function timer() {
        t = setTimeout(add, 1000);
    }

    timer();
}


// Stop timer function
function stop() {
    clearTimeout(t);
}