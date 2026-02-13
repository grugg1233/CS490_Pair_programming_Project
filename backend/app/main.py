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


@app.route("/customerDelete/<int:customer_id>", methods=["GET", "POST"])
def delete_cust(customer_id: int):
    b = t.remove_customer(customer_id)
    if not b:
        return f"ERROR - removing customer with customer id {customer_id}"
    else:
        return jsonify({"success": True})


@app.route("/customersAll", methods=["GET"])
def get_customers():
    return jsonify(t.get_all_customers())


@app.route("/customers/<int:customer_id>", methods=["GET"])
def spec_customer(customer_id):
    return jsonify(t.spec_customer(customer_id))


@app.route("/addCustomer", methods=["POST"])
def add_cust_post():
    # customer table information
    first_name = request.form.get("first_name")
    last_name = request.form.get("last_name")
    email = request.form.get("email")
    # customer address information
    address = request.form.get("address")
    district = request.form.get("district")
    city = request.form.get("city")
    postal_code = request.form.get("postal_code")
    phone = request.form.get("phone")
    if t.add_customer_address(address, district, city, phone, postal_code):
        t.add_customer(first_name, last_name, email, phone)
        return jsonify({"success": True})
    else:
        return "ERROR - adding address failed "


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


@app.route("/searchfilms/<string:query>", methods=["GET"])
def return_search_film(query: str):
    return jsonify(t.search_films(query))


@app.route("/searchcustomers/<string:query>", methods=["GET"])
def return_search_customers(query: str):
    return jsonify(t.search_customer(query))


if __name__ == "__main__":
    app.run(debug=True)
