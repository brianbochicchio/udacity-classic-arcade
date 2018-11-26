/*
    **
    **  Enemy class and functions
    **
 */
const Enemy = function () {

    this.initEnemy();
    this.sprite = 'images/enemy-bug.png';
    this.width = 101;
    this.height = 80;

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // movements multiplied by the dt parameter to
    // ensure the consistent speed on all devices

    // move the enemy or reset it's position and speed
    if (!(this.x > (ctx.canvas.width + 30))) {
        this.x += this.speed * dt;
    } else {
        this.initEnemy();
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    //TODO:  this is in the wrong place also want a black Stroke like a meme
    ctx.font = "36pt impact";
    ctx.lineWidth  ="3pt";
    ctx.strokeStyle = "black";
    ctx.fillStyle = "white";
    ctx.fillText(player.score, 400, 550);
};

Enemy.prototype.initEnemy = function () {
    this.x = -105;
    this.y = Math.floor(Math.random() * 180) + 60;
    this.speed = Math.floor(Math.random() * 300) + 50;
    // TODO: tune speed some enemies are too fast
}


/*
    **
    **  Player class and functions
    **
 */
const Player = function () {
    this.x = 200;
    this.y = 400;
    this.sprite = 'images/char-boy.png';
    this.width = 70;
    this.height = 80;
    this.score = 0;
    this.lives = 3;
};

Player.prototype.update = function () {

    //TODO: When the player reaches y of zero this is win
    // need to create a scoring system to track this
    if (player.y === 0) {
        player.score += 100;
        player.resetPlayer();
        console.log(player.score);
    }

};

Player.prototype.resetPlayer = function () {
    player.x = 200;
    player.y = 400;
}

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Moves player upon a valid key input and also prevents them from going off canvas
Player.prototype.handleInput = function (keyCode) {
    switch (keyCode) {
        case 'up':
            if (!(this.y <= 0))
                this.y -= 20;
            break;
        case 'down':
            if (!(this.y >= 440))
                this.y += 20;
            break;
        case 'left':
            if (!(this.x <= 0))
                this.x -= 20;
            break;
        case 'right':
            if (!(this.x >= 410))
                this.x += 20;
            break;
        default:
        // do nothing
    }


};


/*
    **
    **  Create Objects and Listener
    **
 */
// Place all enemy objects in an array called allEnemies
const numberOfEnemies = 3;
const allEnemies = [];
for (let i = 0; i < numberOfEnemies; i++) {
    allEnemies.push(new Enemy());
}

// Place the player object in a variable called player
const player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//Invoked by engine.js update function
function checkCollisions() {
    // Based on 2D Basic Collision Example from
    // http://blog.sklambert.com/html5-canvas-game-2d-collision-detection#d-collision-detection
    // by Steven Lambert January 13, 2013

    for (const enemy of allEnemies) {
        if (player.x < enemy.x + enemy.width && player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height && player.y + player.height > enemy.y) {
            player.resetPlayer();
        }
    }
}
