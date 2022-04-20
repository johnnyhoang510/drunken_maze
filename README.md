# Drunken Maze

[Live Link!](https://johnnyhoang510.github.io/drunken_maze/)

Drunken Maze is a single player game where the user is tasked with navigating the character out of the maze. The main obstacles are that the character has limited visibility and a health bar that is gradually decreasing. The user can pick up items along the way to heal or affect visibility, but if the health bar reaches 0 before they can make it out of the maze and into the taxi to get home, you lose!

## Functionality & MVPs

In this game, users will be able to:
* Move the character using the arrow keys
* Pick up items with different effects
* Play again once the game is over
* Mute/unmute game music

## Features

* The following code block detects collision and stops the character from walking through walls. It also tracks which direction the character is coming from by reading an instance variable from the last key that was pressed from the player. Depending on which direction, the logic will decide where the player's x or y position will end up.
```js
this.maze.horiObjects.forEach(wall => {
            if (this.checkCollision(this.player, wall)) {
                if (this.player.lastKey === "down") {
                    this.player.y = wall.y + wall.height;
                    this.player.keys.down.pressed = false; 
                    this.player.animationCount = 0; // stops frame from switching
                    this.player.velocity.x = 0;
                } else if (this.player.lastKey === "up") {
                    this.player.y = wall.y - wall.height; // if char is coming from top, this will keep them above the obj
                    this.player.keys.up.pressed = false;
                    this.player.animationCount = 0;
                    this.player.velocity.x = 0;
                }
            }
        })

        this.maze.vertObjects.forEach(wall => {
            if (this.checkCollision(this.player, wall)) {
                if (this.player.lastKey === "right") {
                    this.player.x = wall.x + wall.width;
                    this.player.keys.right.pressed = false;
                    this.player.animationCount = 0;
                    this.player.velocity.x = 0;

                } else if (this.player.lastKey === "left") {
                    this.player.x = wall.x - wall.width; // if coming from left, keeps them on left side
                    this.player.keys.left.pressed = false;
                    this.player.animationCount = 0;
                    this.player.velocity.x = 0;
                }
            }
        })
```

## Technologies, Libraries, APIs
* JavaScript
* HTML
* CSS
* Canvas API

## Future Improvements
* More levels
* Additional characters to choose from
* More items with different effects
