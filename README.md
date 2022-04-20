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
<img src="https://media.giphy.com/media/OjUL12SKvOmXePjQAL/giphy.gif">
* The user can guide the character to pick up different items. Each item will affect the player's circle radius - it can either enlarge or shrink depends on the item!

<img src="https://media.giphy.com/media/4KP4R8azEP0JjbOxfy/giphy.gif">
* The following code block detects collision and stops the character from walking through walls. Stored in the maze are all the wall objects - both vertical and horizonatal. I used a function checkCollision and also tracked which direction the character was coming from by reading an instance variable from the last key that was pressed from the player. Depending on which key was pressed, the logic will decide where the player's x or y position will end up and to also stop their animation frame from switching.
```js
this.maze.horiObjects.forEach(wall => {
            if (this.checkCollision(this.player, wall)) {
                if (this.player.lastKey === "down") {
                    this.player.y = wall.y + wall.height;
                    this.player.keys.down.pressed = false; 
                    this.player.animationCount = 0; //
                    this.player.velocity.x = 0;
                } else if (this.player.lastKey === "up") {
                    this.player.y = wall.y - wall.height;
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
                    this.player.x = wall.x - wall.width;
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
