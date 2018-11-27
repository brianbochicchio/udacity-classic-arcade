# Project Notes


## Requirements from Rubric

The game functions correctly and runs error free

- [X] Player can not move off screen
- [X] Vehicles cross the screen
- [X] Vehicle-player collisions happen logically (not too early or too late)
- [*] Vehicle-player collision resets the game (see Additional Behaviors)
- [*] Something happens when player wins (see Additional Behaviors)

- [X] Game objects (player and vehicles) are implemented using JavaScript object-oriented programming features.
- [X] README file is included detailing all steps required to successfully run the application.

## Additional Behaviours and Adjustments

- [X] Vehicle Speed and Location is randomized
- [X] Vehicle-player collision resets player position 
- [X] Player score increases when reaching the water tile
- [X] Player score increases when colliding with gem
- [X] Player life count increases with colliding with heart
- [X] Game Ends player runs out of lives (Life is removed upon Vehicle-Player collision)




## Enemies

* Properties
    * Image, X, Y, Speed
     
* Functions
    *  Update
        * Check X position  
            * Move along X or reset position and speed
    *  Render into new position  
    
## Player

* Properties
    * Image
     
* Functions
    *  Update
    *  Render
    *  HandleInput 