function generateArt() {
  const textInput = document.getElementById('textInput').value;
  fetch('/generate-art', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: textInput }),
  })
  .then(response => response.blob())
  .then(blob => {
      const imageUrl = URL.createObjectURL(blob);
      document.getElementById('artImage').src = imageUrl;
  })
  .catch(error => console.error('Error:', error));
}
