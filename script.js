const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

// Get mouse position
let mouse = {
    x: null,
    y: null,
    radius: (canvas.height / 80) * (canvas.width / 80)
};

window.addEventListener(
    'mousemove',
    function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
    }
);

// Particle class for creating each particle
class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY  = directionY;
        this.size = size;
        this.color = color;
    }

    // This method draws individual particles
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillstyle = '#BBBBBB';
        ctx.fill();
    }

    // Check particle position, mouse position, move the particle, draw the particle
    update() {
        // Check particle is within canvas
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }

        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }

        // Collision detection between mouse and particle
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius + this.size) {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10)
                this.x += 10;

            if (mouse.x > this.x && this.x > this.size * 10)
                this.x -= 10;

            if (mouse.y < this.y && this.y < canvas.height - this.size * 10)
                this.y += 10;

            if (mouse.y > this.y && this.y > canvas.height - this.size * 10)
                this.y += 10;
        }

        // Move particle
        this.x += this.directionX;
        this.y += this.directionY;

        // Draw particle
        this.draw();
    }
}

// Create particle array
function init() {
    particlesArray = [];
    let numberOfParticles = canvas.height * canvas.width / 8000;

    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 5) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 2) - 0.5;
        let directionY = (Math.random() * 2) - 0.5;
        let color = '#BBBBBB';

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

// Check if particles are close enough to draw lines between them
function connect() {
    let opacityValue = 1;

    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = 0; b < particlesArray.length; b++) {
            let distance = (
                (particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x) 
                + (particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y)
            );

            if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                opacityValue = 1 - (distance / 20000);
                
                ctx.lineWidth = 1;
                ctx.strokeStyle = 'rgba(128, 128, 128,' + opacityValue + ')';
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }

    connect();
}

// Resize event
window.addEventListener(
    'resize',
    function() {
        canvas.width = this.innerWidth;
        canvas.height = this.innerHeight;
        mouse.radius = ((canvas.height / 80) * (canvas.height / 80));
        init();
    }
);

// Mouse-out event to reset mouse postition whenever cursor is off the page
window.addEventListener(
    'mouseout',
    function() {
        mouse.x = undefined;
        mouse.y = undefined;
    }
)

init();
animate();