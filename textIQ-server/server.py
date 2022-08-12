from flask import Flask, request
from flask_cors import CORS, cross_origin

from textProcess import preprocess

APP_NAME = "textIQ"
app = Flask(APP_NAME)
CORS(app, support_credentials=True)

@app.post("/text")
@cross_origin(supports_credentials=True)
def process():
    print("alive")
    body = request.json
    print(body)
    text = body["text"]
    text = preprocess(text)
    return text

if __name__ == "__main__":
    app.run(debug=False)