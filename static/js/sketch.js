function setup() {
    let canvas = createCanvas(400, 400);
    canvas.parent('art');
    background(255); // Start with a white background
  }
  
  function draw() {
    // empty for now
  }
  

function analyseText() {
    let userText = document.getElementById('userText').value;

    fetch('/analyse', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: userText }),
    })
    .then(response => response.json())
    .then(data => {
        let sentiment = data.sentiment;
        generateArtBasedOnSentiment(sentiment);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function drawFlower(x, y, size, color) {
    push(); // Start a new drawing state
    translate(x, y);
    noStroke();
    for (let i = 0; i < 10; i++) {
      fill(color);
      ellipse(0, size, size / 2, size);
      rotate(PI / 5);
    }
    pop(); // Restore original state
  }


function drawGeometry(x, y, size, color) {
    push();
    translate(x, y);
    fill(color);
    rotate(frameCount / -100.0);
    polygon(0, 0, size, 6); // Hexagon
    pop();
  }
  
  function polygon(x, y, radius, npoints) {
    let angle = TWO_PI / npoints;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = x + cos(a) * radius;
      let sy = y + sin(a) * radius;
      vertex(sx, sy);
    }
    endShape(CLOSE);
  }

  
// Assume an array named `drops` to store raindrop objects
function drawRaindrop(drop) {
    push();
    fill(100, 100, 255, 150); // Semi-transparent blue
    noStroke();
    ellipse(drop.x, drop.y, 5, 5);
    // Update drop position for animation
    drop.y += drop.speed;
    // Check for 'ground' collision to create a ripple
    if (drop.y >= height - 10) {
      drawRipple(drop.x, height - 10);
      drop.y = 0; // Reset drop to 'fall' again
    }
    pop();
  }
  
  function drawRipple(x, y) {
    push();
    stroke(100, 100, 255);
    noFill();
    for (let i = 0; i < 5; i++) {
      ellipse(x, y, i * 10, i * 5);
    }
    pop();
  }

  
function generateArtBasedOnSentiment(sentiment) {
    // Clear only if necessary; otherwise, let the garden grow
    let x = random(width);
    let y = random(height);
    if (sentiment > 0.1) {
      drawFlower(x, y, sentiment * 25, [random(100, 255), random(100), random(100, 255)]);
    } else if (sentiment < -0.1) {
      drops.push({x: x, y: 0, speed: random(1, 5)}); // Add a new drop
    } else {
      drawGeometry(x, y, sentiment * 50 + 20, [random(100, 255), random(100, 255), random(100, 255)]);
    }
  }
  
  