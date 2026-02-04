# Video used: https://youtu.be/WBqHr2kPc_A?si=FKfVQMptaeODTMCE

import mysql.connector as connecter


connection = connecter.connect(
    user="root", password="root", host="localhost", port="3306", database="sakila"
)

cursor = connection.cursor()

cursor.execute(
    """SELECT
    film.film_id,
    film.title,
    COUNT(rental.rental_id) AS rental_count
FROM rental
JOIN inventory ON rental.inventory_id = inventory.inventory_id
JOIN film ON inventory.film_id = film.film_id
JOIN film_actor ON film.film_id = film_actor.film_id
WHERE film_actor.actor_id = (
    SELECT film_actor.actor_id
    FROM film_actor
    GROUP BY film_actor.actor_id
    ORDER BY COUNT(film_actor.film_id) DESC
    LIMIT 1
)
GROUP BY film.film_id, film.title
ORDER BY rental_count DESC
LIMIT 5;"""
)

films = cursor.fetchall()

connection.close()

for film in films:
    print(film, "\n")
