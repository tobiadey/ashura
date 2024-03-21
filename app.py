import io, random

from flask import Flask, send_file, request, render_template
from textblob import TextBlob
from PIL import Image, ImageDraw


app = Flask(__name__)


def analyse_sentiment(text):
    analysis = TextBlob(text)
    return analysis.sentiment.polarity


def generate_abstract_art(sentiment):
    width, height = 600, 400
    image = Image.new("RGB", (width, height), "white")
    draw = ImageDraw.Draw(image)

    for _ in range(100):  # Draw 100 shapes
        if sentiment > 0:
            color = (
                random.randint(150, 255),
                random.randint(100, 150),
                random.randint(0, 100),
            )
            radius = random.randint(10, 20)
            x = random.randint(0, width)
            y = random.randint(0, height)
            draw.ellipse(
                [x - radius, y - radius, x + radius, y + radius],
                fill=color,
                outline=color,
            )
        else:
            color = (
                random.randint(0, 100),
                random.randint(100, 150),
                random.randint(150, 255),
            )
            num_points = random.randint(3, 5)
            points = [
                (random.randint(0, width), random.randint(0, height))
                for _ in range(num_points)
            ]
            draw.polygon(points, fill=color, outline=color)

    img_io = io.BytesIO()
    image.save(img_io, "PNG")
    img_io.seek(0)
    return img_io


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/generate-art", methods=["POST"])
def art():
    data = request.json
    text = data["text"]
    sentiment = analyse_sentiment(text)
    img_io = generate_abstract_art(sentiment)
    return send_file(img_io, mimetype="image/png")


if __name__ == "__main__":
    app.run(debug=True)
