from flask import Flask, render_template, request, jsonify
from textblob import TextBlob

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/analyse", methods=["POST"])
def analyse_sentiment():
    data = request.get_json()
    text = data["text"]
    analysis = TextBlob(text)
    sentiment = analysis.sentiment.polarity  # -1 (negative) to 1 (positive)
    return jsonify({"sentiment": sentiment})


if __name__ == "__main__":
    app.run(debug=True)
