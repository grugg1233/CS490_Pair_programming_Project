import string
from app.src import test as t
from flask import Flask, jsonify, request
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
    return jsonify(t.return_Film_Modal_Info(film_id))


@app.route("/filminfo/actors/<int:film_id>", methods=["GET"])
def film_modal_actors(film_id: int):
    return jsonify(t.return_Film_Modal_actors(film_id))


@app.route("/customerDelete/<int:customer_id>", methods=["POST"])
def delete_cust(customer_id: int):
    return jsonify(t.remove_customer(customer_id))


@app.route("/customersAll", methods=["GET"])
def get_customers():
    return jsonify(t.get_all_customers())


@app.route("/addCustomer", methods=["POST"])
def add_cust_post():
    # customer table information
    customer_id = request.form.get("customer_id")
    store_id = request.form.get("store_id")
    first_name = request.form.get("first_name")
    last_name = request.form.get("last_name")
    email = request.form.get("email")
    address_id = request.form.get("address_id")
    active = request.form.get("active")

    # customer address information
    address = request.form.get("address")
    address2 = request.form.get("address2")
    district = request.form.get("district")
    city_id = request.form.get("city_id")
    postal_code = request.form.get("postal_code")
    phone = request.form.get("phone")
    location = request.form.get("location")

    t.add_customer(
        customer_id, store_id, first_name, last_name, email, address_id, active
    )
    t.add_customer_address(
        address_id, address, address2, district, city_id, postal_code, phone, location
    )


@app.route("/filmgenre/<string:genre>", methods=["GET"])
def return_genre_films(genre: str):
    if genre == "All":
        films = t.return_all_film()
    else:
        films = t.return_genre_films(genre=genre)

    return jsonify(films)


@app.route("/servertest", methods=["GET"])
def test():
    return "Hello World"


if __name__ == "__main__":
    app.run(debug=True)
