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
    // Array of available sprites
    const enemyVariants = [
        'images/enemy-bug.png',
        'images/enemy-bug-2.png',
        'images/enemy-bug-3.png',
        'images/enemy-bug-4.png'];

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
//TODO: Handling the restart here seems wrong
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

// Helper function that puts the player back at the starting location
Player.prototype.resetPlayerLocation = function () {
    player.x = 200;
    player.y = 400;
}

Player.prototype.update = function () {
    // Checks the player location to see if they have crossed safely
    // and increments the player score if they have
    // Also generates a bonus item
    if (player.y === 0) {
        player.score += 100;
        player.resetPlayerLocation();
        bonusItem.visible ? '' : bonusItem.show();

    }

};

// Draw the player on the screen, required method for game
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*
    **
    **  Bonus object definition and functions
    **
 */
const BonusItem = function () {
    // Sets default properties for the player
    this.x = -105;
    this.y = Math.floor(Math.random() * 200) + 80;
    this.sprite = 'images/Gem Green.png';
    this.speed = 0;
    this.width = 70;
    this.height = 80;
    this.drift = 0;
    this.visible = false;

};

BonusItem.prototype.update = function (dt) {
    if ((!game.gameOver)) {
        // If the bonus item is visible and the game is not over, the item advances
        // Otherwise the item is hidden off screen
        if (!(this.x > (ctx.canvas.width + 30)) && (!game.gameOver)) {
            this.x += this.speed * dt;
            this.y += this.drift;
        } else {
            this.hide();
        }
    } else {
        this.hide();
    }

};

// Helper function that puts the player back at the starting location
BonusItem.prototype.hide = function () {
    this.x = -105;
    this.y = 0;
    this.speed = 0;
    this.visible = false;
}

// Helper function that puts the player back at the starting location
BonusItem.prototype.show = function () {
    const bonusItemVariants = [
        'images/Heart.png',
        'images/Gem Green.png'];

    this.x = -105;
    this.y = Math.floor(Math.random() * 300) + 20;
    this.speed = Math.floor(Math.random() * 100) + 50;
    this.sprite = bonusItemVariants[Math.floor(Math.random() * 2)];
    if (this.y >= 50 && this.y <= 200) {
        this.drift = .3;
    } else {
        this.drift = -.3;
    }

    this.visible = true;

}

// Draw the bonus item on the screen, required method for game
BonusItem.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*
    **
    **  Game definition and functions
    **
 */
const Game = function () {

    // Game default state properties
    this.gameOver = false;
    this.gamePlayerLives = "Lives: 0";
    this.gamePlayerScore = "Score: 0";
    this.gameHighScore = 0;
    this.gameHighScoreText = "High Score: 0";
    this.isNewHighScore = false;

    // Frequently referenced game properties
    this.cXCenter = 252.5;
    this.cYCenter = 303;
    this.finalScoreYOffset = this.cYCenter + 50;

};

// Check the player properties before rendering the lives, score and high score
Game.prototype.updateGameStatus = function () {
    this.gamePlayerLives = "Lives: " + player.lives;
    this.gamePlayerScore = "Score: " + player.score;

    // If the player beats the current high score while playing update it now
    // to provide extra motivation
    if (this.gameHighScore < player.score) {
        this.gameHighScore = player.score;
        this.gameHighScoreText = "High Score: " + game.gameHighScore;
        this.isNewHighScore = true;
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
        player.resetPlayerLocation();
        ctx.font = "24pt sans-serif";
        ctx.fillText("Press (y) to play again", game.cXCenter, game.finalScoreYOffset + 100);
    }

    // if the player beat the previous high score enlarge the text
    // and make it red to provide extra motivation
    ctx.textAlign = "center";
    if (game.isNewHighScore) {
        ctx.font = "14pt sans-serif";
        ctx.fillStyle = "red";
    } else {
        ctx.font = "12pt sans-serif";
        ctx.fillStyle = "black";
    }
    ctx.fillText(game.gameHighScoreText, 253, 40);

};

// Reset the player and game properties
// Leave the high score
Game.prototype.restart = function () {
    player.lives = 3;
    player.score = 0;
    game.isNewHighScore = false;
    game.gameOver = false;

}

/*
    **
    **  Create game, enemies, player and setup key Listener
    **
 */
// Create Game
const game = new Game();

//Create bonusItem
const bonusItem = new BonusItem();

// Create the enemy array
const allEnemies = [];
// Set the number of enemies to generate
const numberOfEnemies = 3;
// Populate the enemy array
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
        if ((player.x + 40) < enemy.x + enemy.width && player.x + player.width > enemy.x &&
            (player.y + 72) < enemy.y + enemy.height && (player.y - 17) + player.height > enemy.y) {
            player.lives -= 1;
            player.resetPlayerLocation();
        }

        if (player.lives <= 0) {
            game.gameOver = true;
        }
    }

    if (player.x < bonusItem.x + bonusItem.width && player.x + player.width > bonusItem.x &&
        player.y < bonusItem.y + bonusItem.height && player.y + player.height > bonusItem.y) {
        if (bonusItem.sprite.includes("Heart")) {
            player.lives += 1;

        } else {
            player.score += 200;
        }

        bonusItem.hide();

    }
}

