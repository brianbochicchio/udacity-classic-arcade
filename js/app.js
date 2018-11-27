/*
    **
    **  Enemy class and functions
    **
 */
const Enemy = function () {
    // Positions enemy off-canvas and not moving with a the default sprite
    this.x = -105;
    this.y = -105;
    this.speed = 0;
    this.sprite = 'images/enemy-bug.png';
    this.width = 101;
    this.height = 80;

    // Update enemy to start moving and a random sprite (color)
    this.initEnemy();

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
// Movements are multiplied by the dt parameter to
// ensure the consistent speed on all devices
Enemy.prototype.update = function (dt) {

    // If the enemy is visible and the game is not over, the enemy advances
    // Otherwise the enemy is re-initialized
    if (!(this.x > (ctx.canvas.width + 30)) && (!game.gameOver)) {
        this.x += this.speed * dt;
    } else {
        this.initEnemy();
    }

};

// Sets the enemy's location, speed and color
Enemy.prototype.initEnemy = function () {
    this.x = -105;
    this.y = Math.floor(Math.random() * 180) + 60;
    this.speed = Math.floor(Math.random() * 300) + 50;
    this.sprite = enemyVariants[Math.floor(Math.random() * 4)];

}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

/*
    **
    **  Player class and functions
    **
 */
const Player = function () {
    // Sets default properties for the player
    this.x = 200;
    this.y = 400;
    this.sprite = 'images/char-boy.png';
    this.width = 70;
    this.height = 80;
    this.score = 0;
    this.lives = 3;
};

// Moves player upon a valid key input and also prevents them from going off canvas
// If the game is over, it prevents any player movement and handles the called to
// restart the game.
Player.prototype.handleInput = function (keyCode) {
    if (!game.gameOver) {
        switch (keyCode) {
            case 'up':
                if (!(this.y <= 0))
                    this.y -= 20;
                break;
            case 'down':
                if (!(this.y >= 400))
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
    } else {
        if (keyCode === 'y') {
            game.restart();
        }
    }

};

Player.prototype.update = function () {

    // If the player reaches the water add 100 to the score and reset their location
    if (player.y === 0) {
        player.score += 100;
        player.resetPlayer();

    }

};

Player.prototype.resetPlayer = function () {
    player.x = 200;
    player.y = 400;
}

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


/*
    **
    **  Game definition and functions
    **
 */
const Game = function () {

    // Game state properties
    this.gameOver = false;
    this.gamePlayerLives = "Lives: 0";
    this.gamePlayerScore = "Score: 0";
    this.gameHighScore = 0;
    this.gameHighScoreText = "High Score: 0";

    // Frequently referenced game properties
    this.cXCenter = 252.5;
    this.cYCenter = 303;
    this.finalScoreYOffset = this.cYCenter + 50;

};

// Get player properties before
Game.prototype.updateGameStatus = function () {
    game.gamePlayerLives = "Lives: " + player.lives;
    game.gamePlayerScore = "Score: " + player.score;

    if (game.gameHighScore < player.score) {
        game.gameHighScore = player.score;
        game.gameHighScoreText = "High Score: " + game.gameHighScore;
    }


}


Game.prototype.render = function () {


    //Draw updated life count and score

    if ((!game.gameOver)) {
        ctx.font = "24pt impact";
        ctx.lineWidth = "1";
        ctx.strokeStyle = "black";
        ctx.fillStyle = "white";
        ctx.textAlign = "left";
        ctx.fillText(game.gamePlayerLives, 5, 45);
        ctx.strokeText(game.gamePlayerLives, 5, 45);
        ctx.textAlign = "right";
        ctx.fillText(game.gamePlayerScore, 500, 45);
        ctx.strokeText(game.gamePlayerScore, 500, 45);
    } else {
        ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fill();
        ctx.textAlign = "center";
        ctx.font = "72pt impact";
        ctx.fillStyle = "white";
        ctx.fillText("GAME OVER", game.cXCenter, game.cYCenter);
        ctx.strokeText("GAME OVER", game.cXCenter, game.cYCenter);
        ctx.font = "36pt impact";
        ctx.fillText(game.gamePlayerScore, game.cXCenter, game.finalScoreYOffset);
        ctx.strokeText(game.gamePlayerScore, game.cXCenter, game.finalScoreYOffset);
        player.resetPlayer();
        ctx.font = "24pt sans-serif";
        ctx.fillText("Press (y) to play again", game.cXCenter, game.finalScoreYOffset + 100);
    }

    ctx.textAlign = "left";
    ctx.font = "12pt sans-serif";
    ctx.fillStyle = "black";
    ctx.fillText(game.gameHighScoreText, 200, 40);


};


Game.prototype.restart = function () {
    console.log("Game Restart Requested")
    player.lives = 3;
    player.score = 0;
    game.gameOver = false;

    for (let i = 0; i < numberOfEnemies; i++) {
        allEnemies[i].sprite = enemyVariants[Math.floor(Math.random() * 4)];

    }

}


/*
    **
    **  Create game, enemies, player and setup key Listener
    **
 */
// Create Game and set defaults
const game = new Game();

// Place all enemy objects in an array called allEnemies
const numberOfEnemies = 3;

const enemyVariants = [
    'images/enemy-bug.png',
    'images/enemy-bug-2.png',
    'images/enemy-bug-3.png',
    'images/enemy-bug-4.png'];

const allEnemies = [];
for (let i = 0; i < numberOfEnemies; i++) {
    allEnemies.push(new Enemy());

}

//Create the player
const player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        89: 'y'
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
            player.lives -= 1;
            player.resetPlayer();
        }

        if (player.lives <= 0) {
            game.gameOver = true;
        }
    }
}

