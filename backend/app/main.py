import string
from app.src import queries as t
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
        return jsonify({"success": False, "error": f"ERROR - removing customer with customer id {customer_id}"}), 500
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
    data = request.get_json()

    first_name = data.get("first_name")
    last_name = data.get("last_name")
    email = data.get("email")

    address = data.get("address")
    district = data.get("district")
    city = data.get("city")
    postal_code = data.get("postal_code")
    phone = data.get("phone")

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


@app.route("/updateCustomer/<int:customer_id>", methods=["PUT"])
def update_customer(customer_id: int):
    data = request.get_json() or {}


    required = ["first_name", "last_name", "email", "address", "district", "city"]
    missing = [k for k in required if not data.get(k)]
    if missing:
        return jsonify({"success": False, "error": f"Missing fields: {missing}"}), 400

    try:
        result = t.edit_cust(customer_id, data)
        return jsonify({"success": True, **result})
    except Exception as e:

        return jsonify({"success": False, "error": str(e)}), 500

@app.route("/customerRentalHistory/<int:customer_id>", methods=["GET"])
def customer_rental_history(customer_id: int):
    return jsonify(t.customer_rental_and_return_history(customer_id))

@app.route("/customerRentFilm/<int:customer_id>", methods=["POST"])
def customer_rent_film(customer_id: int):
    data = request.get_json() or {}
    inventory_id = data.get("inventory_id")
    staff_id = data.get("staff_id", 1)

    if inventory_id is None:
        return jsonify({"success": False, "error": "Missing inventory_id"}), 400

    result = t.customer_rent_a_film(customer_id, int(inventory_id), int(staff_id))

    if not result.get("ok"):

        return jsonify({"success": False, **result}), 409

    return jsonify({"success": True, **result})

@app.route("/customerReturnFilm/<int:customer_id>", methods=["POST"])
def customer_return_film(customer_id: int):
    data = request.get_json() or {}
    inventory_id = data.get("inventory_id")

    if inventory_id is None:
        return jsonify({"success": False, "error": "Missing inventory_id"}), 400

    ok = t.customer_return_a_film(customer_id, int(inventory_id))
    if not ok:

        return jsonify({"success": False, "error": "No active rental found to return"}), 409

    return jsonify({"success": True})



if __name__ == "__main__":
    app.run(debug=True)
