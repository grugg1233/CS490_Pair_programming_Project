from test import return_films
from flask import Flask

app = Flask(__name__)


@app.route("/")
def return_films():
    films = return_films()
    return films


if __name__ == "__main__":
    app.run(debug=True)
