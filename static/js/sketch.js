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

function generateArtBasedOnSentiment(sentiment) {
    console.log("sentiment");
    console.log(sentiment);
    clear(); // Clear previous artwork
    background(255); // Reset background to white

    let c = lerpColor(color('blue'), color('red'), (sentiment + 1) / 2);
    fill(c);
    noStroke();
    ellipse(width / 2, height / 2, 200, 200); // Draw a circle
  }