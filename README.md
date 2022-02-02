# Particles-animation-using-Vanilla-JS

#### This is a simple JavaScript project that simulates motion of randomly generated particles

This code is about random motion of particles. 
The number of particles to display is decided by the screen size.
The screen size is divided by a constant to get the number of particles to be displayed.
These particles are then set in random motion. 

However, the actual effect takes place when two or more particles travel through a defined vicinity.
When these particles are travelling close to other neighbouring particles, they are connected with lines.
When the particles drift apart, the lines connecting them fade away as the distance between them increases.

An additional effect is added by making the particles move when the mouse pointer comes close to them.

The code is implemented as follows:
1. Create particles whose number depends on screen size
2. Randomly choose the position of the particles on the canvas and its size
3. Make the particles move
4. If two or more particles are moving close within a predefined area, create a line between them
5. When they drift apart, make the lines fade
6. Get mouse pointer position and see if any particles are around it
7. Move the particles if they are near the mouse pointer
 
The final result:

<img src="output/particles.gif">
