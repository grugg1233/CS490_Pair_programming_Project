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

@app.route("/filminfo/<int:film_id>", methods=["GET"])
def film_modal_info(film_id: int):
    return jsonify(t.return_Film_Modal_actors(film_id))

@app.route("/filminfo/actors/<int:film_id>", methods=["GET"])
def film_modal_actors(film_id: int): 
    return jsonify(t.return_Film_Modal_actors(film_id))

if __name__ == "__main__":
    app.run(debug=True)
