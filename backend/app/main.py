from app.src import test as t
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

cors = CORS(app, resources={r"*": {"origins": "*"}})


@app.route("/", methods=["GET"])
def return_films():
    return jsonify(t.return_films())

if __name__ == "__main__":
    app.run(debug=True)
