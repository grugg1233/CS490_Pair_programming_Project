import mysql.connector as connecter

DB_CONFIG = dict(
    user="root",
    password="root",
    host="db",
    port=3306,
    database="sakila",
)


def return_films():
    sql = """
        SELECT
            i.film_id,
            f.title,
            c.name AS category,
            COUNT(*) AS count
        FROM rental r
        JOIN inventory i      ON r.inventory_id = i.inventory_id
        JOIN film f           ON i.film_id = f.film_id
        JOIN film_category fc ON f.film_id = fc.film_id
        JOIN category c       ON fc.category_id = c.category_id
        GROUP BY i.film_id, f.title, c.name
        ORDER BY count DESC
        LIMIT 5;
    """
    with connecter.connect(**DB_CONFIG) as connection:
        with connection.cursor(dictionary=True) as cursor:
            cursor.execute(sql)
            return cursor.fetchall()


def return_actors(s_id: int):
    sql = """
        SELECT
            a.actor_id,
            a.first_name,
            a.last_name,
            s.store_id,
            addr.address,
            COUNT(*) AS count
        FROM rental r
        JOIN inventory i   ON r.inventory_id = i.inventory_id
        JOIN store s       ON i.store_id = s.store_id
        JOIN address addr  ON s.address_id = addr.address_id
        JOIN film_actor fa ON fa.film_id = i.film_id
        JOIN actor a       ON a.actor_id = fa.actor_id
        WHERE s.store_id = %s
        GROUP BY a.actor_id, a.first_name, a.last_name, s.store_id, addr.address
        ORDER BY count DESC
        LIMIT 5;
    """
    with connecter.connect(**DB_CONFIG) as connection:
        with connection.cursor(dictionary=True) as cursor:
            cursor.execute(sql, (s_id,))
            return cursor.fetchall()


def return_top5films_top5Actors(s_id: int):
    sql = """
    WITH top_actors AS (
        SELECT fa.actor_id
        FROM inventory i
        JOIN rental r      ON r.inventory_id = i.inventory_id
        JOIN film_actor fa ON fa.film_id = i.film_id
        WHERE i.store_id = %s
        GROUP BY fa.actor_id
        ORDER BY COUNT(*) DESC
        LIMIT 5
    ),
    actor_film_counts AS (
        SELECT
            fa.actor_id,
            f.film_id,
            f.title,
            COUNT(*) AS rental_count
        FROM rental r
        JOIN inventory i   ON r.inventory_id = i.inventory_id
        JOIN film f        ON i.film_id = f.film_id
        JOIN film_actor fa ON f.film_id = fa.film_id
        WHERE i.store_id = %s
          AND fa.actor_id IN (SELECT actor_id FROM top_actors)
        GROUP BY fa.actor_id, f.film_id, f.title
    ),
    ranked AS (
        SELECT
            actor_id,
            film_id,
            title,
            rental_count,
            ROW_NUMBER() OVER (
                PARTITION BY actor_id
                ORDER BY rental_count DESC, title
            ) AS rn
        FROM actor_film_counts
    )
    SELECT actor_id, film_id, title, rental_count
    FROM ranked
    WHERE rn <= 5
    ORDER BY actor_id, rental_count DESC, title;
    """
    with connecter.connect(**DB_CONFIG) as connection:
        with connection.cursor(dictionary=True) as cursor:
            cursor.execute(sql, (s_id, s_id))
            return cursor.fetchall()
