/*
    **
    **  Enemy class and functions
    **
 */
const Enemy = function () {

    this.initEnemy();
    this.sprite = 'images/enemy-bug.png';

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
};

Enemy.prototype.initEnemy = function () {

    this.x = 0;
    this.y = Math.floor(Math.random() * 180) + 60;
    this.speed = Math.floor(Math.random() * 800) + 250;
    // TODO: tune speed some enemies are too fast
    //console.log(`x:${this.x}, y:${this.y}, speed: ${this.speed}`);
    return;

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
};

Player.prototype.update = function () {


};
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (keyCode) {
    switch (keyCode) {
        case 'up':
            if(!(this.y <= 0))
            this.y -= 20;
            break;
        case 'down':
            if (!(this.y >= 440))
            this.y += 20;
            break;
        case 'left':
            if(!(this.x <= 0))
            this.x -= 20;
            break;
        case 'right':
            if(!(this.x >= 410))
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
for (let i = 0; i < numberOfEnemies ; i++) {
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
