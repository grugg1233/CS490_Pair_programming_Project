from app.src import test as t
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"*": {"origins": "*"}})

@app.route("/topFilms", methods=["GET"])
def return_films():
    return jsonify(t.return_films())

@app.route("/topactors/<int:store_id>", methods=["GET"])
def top_actors(store_id: int):
    return jsonify(t.return_actors(store_id))

@app.route("/topactorsfilms/<int:store_id>", methods=["GET"])
def top_actors_films(store_id: int):
    return jsonify(t.return_top5films_top5Actors(store_id))

if __name__ == "__main__":
    app.run(debug=True)
