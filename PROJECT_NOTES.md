# Project Notes

Note that the Rubric uses Vehicle to refer to enemies. The provided project source uses enemy rather than vehicle. The term enemy is used in place of vehicle here to be consistent with the source.   

## Requirements from Rubric

- [X] The game functions correctly and runs error free
- [X] Player can not move off screen
- [X] Enemies cross the screen
- [X] Enemy/Player collisions happen logically
- [*] Enemy/Player collision resets the game (see Additional Behaviors)
- [*] Something happens when player wins (see Additional Behaviors)

- [X] Game objects (player and enemies) are implemented using JavaScript object-oriented programming features.
- [X] README file is included detailing all steps required to successfully run the application.

## Additional Behaviours and Adjustments

### Enemies

- [X] Enemy color, speed and crossing location is randomized
- [X] Enemy/Player collision resets player position 
- [X] Enemy/Player collision deducts 1 from player life

### Player
- [X] Player score increases when reaching the water tile
- [X] Player causes a bonus item to appear when reaching the water tile
- [X] Player handles keyboard input for character movement and game reset

### Bonus Items
- [X] Item type, speed, drift and crossing location is randomized
- [X] Heart Item/Player collision increases player score by 200 points
- [X] Green Gem Item/Player collision increases player lives by 1

### Game
- [X] Game tracks the lives, score and high score
- [X] Game keeps high score until the browser is refreshed or closed
- [X] Game tracks the GameOver state 
- [X] Game handles resetting the game 

