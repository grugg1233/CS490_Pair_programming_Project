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


def return_Film_Modal_Info(film_id):
    sql = """
        select 
            f.title,
            f.description,
            f.release_year,
            f.length,
            f.rating,
            f.rental_rate,
            f.rental_duration,
            L.name
        from film as f 
            inner join 
                language as L 
                    on f.language_id = L.language_id   
        where
            f.film_id = %s
        ;

    """
    with connecter.connect(**DB_CONFIG) as connection:
        with connection.cursor(dictionary=True) as cursor:
            cursor.execute(sql, (film_id,))
            return cursor.fetchall()


def return_Film_Modal_actors(film_id):
    sql = """
        select
            a.first_name,
            a.last_name 
        from film as f 
            inner join film_actor as fa 
                on f.film_id = fa.film_id  
            inner join actor as a 
                on fa.actor_id = a.actor_id 
        where f.film_id = %s
        order by last_name desc
        ;      
    """
    with connecter.connect(**DB_CONFIG) as connection:
        with connection.cursor(dictionary=True) as cursor:
            cursor.execute(sql, (film_id,))
            return cursor.fetchall()


def get_all_films():
    sql = """
        SELECT f.film_id, f.title
        FROM film f
        ORDER BY f.title;
    """
    with connecter.connect(**DB_CONFIG) as connection:
        with connection.cursor(dictionary=True) as cursor:
            cursor.execute(sql)
            return cursor.fetchall()


def get_all_customers():
    sql = """ 
    select all 
        c.customer_id ,
        c.first_name, 
        c.last_name, 
        c.email, 
        A.address  
    from customer as c 
        inner join address as A 
            on c.address_id = A.address_id 
    where active = 1
    order by 
        customer_id asc; 
    """
    with connecter.connect(**DB_CONFIG) as connection:
        with connection.cursor(dictionary=True) as cursor:
            cursor.execute(sql)
            return cursor.fetchall()


def remove_customer(c_id):
    try:
        with connecter.connect(**DB_CONFIG) as connection:
            with connection.cursor() as cursor:
                connection.start_transaction()


                cursor.execute(
                    "DELETE FROM payment WHERE customer_id = %s;",
                    (c_id,)
                )

                cursor.execute(
                    "DELETE FROM rental WHERE customer_id = %s;",
                    (c_id,)
                )

                cursor.execute(
                    "DELETE FROM customer WHERE customer_id = %s;",
                    (c_id,)
                )

                connection.commit()
        return True
    except Exception:
        try:
            connection.rollback()
        except Exception:
            pass
        return False


def add_customer(first_name, last_name, email, phone):
    try:
        sql = """
            insert into customer (store_id, first_name, last_name, email, active, address_id)
                values(1,
                    %s, 
                    %s,
                    %s,
                    1,
                    (select address_id from address where phone=%s)
            ); 
        ; 
        """
        with connecter.connect(**DB_CONFIG) as connection:
            with connection.cursor(dictionary=True) as cursor:
                cursor.execute(
                    sql,
                    (
                        first_name,
                        last_name,
                        email,
                        phone,
                    ),
                )
            connection.commit()
        return True
    except:
        return False


def add_customer_address(address, district, city, phone, postal_code):
    try:
        with connecter.connect(**DB_CONFIG) as connection:
            with connection.cursor() as cursor:

                cursor.execute(
                    """
                    INSERT INTO city (city, country_id)
                    VALUES (%s, 103)
                    ON DUPLICATE KEY UPDATE city_id = LAST_INSERT_ID(city_id)
                    """,
                    (city,),
                )
                city_id = cursor.lastrowid

                cursor.execute(
                    """
                    INSERT INTO address
                        (address, address2, district, city_id, phone, location, postal_code)
                    VALUES
                        (%s, NULL, %s, %s, %s, ST_GeomFromText('POINT(0.0 0.0)', 0), %s)
                    """,
                    (address, district, city_id, phone, postal_code),
                )

            connection.commit()
        return True

    except Exception as e:
        print("add_customer_address failed:", e)
        return False


def return_all_film():
    sql = """SELECT 
                f.film_id,
                f.title
            FROM 
                film f
            Order By f.title 
            """
    with connecter.connect(**DB_CONFIG) as connection:
        with connection.cursor(dictionary=True) as cursor:
            cursor.execute(sql)
            return cursor.fetchall()


def return_genre_films(genre: str):
    sql = """SELECT 
                f.film_id,
                f.title
            FROM 
                film f
            INNER JOIN film_category fc 
            ON f.film_id = fc.film_id 
            INNER JOIN category c 
            ON fc.category_id = c.category_id 
            Where c.name = %s
            Order By f.title 
        """

    with connecter.connect(**DB_CONFIG) as connection:
        with connection.cursor(dictionary=True) as cursor:
            cursor.execute(sql, (genre,))
            return cursor.fetchall()


def search_films(query: str):
    sql = """
        SELECT DISTINCT
            f.film_id,
            f.title
        FROM film f
        JOIN film_category fc ON f.film_id = fc.film_id
        JOIN category c ON fc.category_id = c.category_id
        JOIN film_actor fa ON f.film_id = fa.film_id
        JOIN actor a ON fa.actor_id = a.actor_id
        WHERE 
            f.title LIKE %s
            OR c.name LIKE %s
            OR a.first_name LIKE %s
            OR a.last_name LIKE %s
        ORDER BY f.title;
    """

    search = f"%{query}%"

    with connecter.connect(**DB_CONFIG) as connection:
        with connection.cursor(dictionary=True) as cursor:
            cursor.execute(sql, (search, search, search, search))
            return cursor.fetchall()


def spec_customer(customer_id):
    sql = """
    select distinct
        c.first_name, 
        c.last_name, 
        c.email, 
        ci.city,
        co.country,
        A.address,
        A.district,
        A.postal_code,
        A.phone
    from customer as c 
        inner join address as A 
            on c.address_id = A.address_id 
        inner join city as ci
            on A.city_id = ci.city_id 
        inner join country as co
            on ci.country_id = co.country_id
    where c.customer_id = %s
    """
    with connecter.connect(**DB_CONFIG) as connection:
        with connection.cursor(dictionary=True) as cursor:
            cursor.execute(sql, (customer_id,))
            return cursor.fetchall()

def search_customer(query: str):
    sql = """
        SELECT 
            c.customer_id,
            c.first_name,
            c.last_name,
            c.email,
            a.address
        FROM customer c
        INNER JOIN address a ON c.address_id = a.address_id
        WHERE c.active = 1
          AND (
              c.first_name LIKE %s
              OR c.last_name LIKE %s
              OR CAST(c.customer_id AS CHAR) LIKE %s
          )
        ORDER BY c.customer_id ASC;
    """
    like = f"%{query}%"
    with connecter.connect(**DB_CONFIG) as connection:
        with connection.cursor(dictionary=True) as cursor:
            cursor.execute(sql, (like, like, like))
            return cursor.fetchall()

def edit_cust(customer_id: int, cust_info: dict):
    sql_customer = """
        UPDATE customer
        SET first_name=%s,
            last_name=%s,
            email=%s,
            active=%s,
            last_update=NOW()
        WHERE customer_id=%s;
    """

    sql_address = """
        UPDATE address a
        JOIN customer c ON c.address_id = a.address_id
        SET a.address=%s,
            a.address2=%s,
            a.district=%s,
            a.city_id=%s,
            a.postal_code=%s,
            a.phone=%s,
            a.last_update=NOW()
        WHERE c.customer_id=%s;
    """

    first_name = cust_info.get("first_name")
    last_name  = cust_info.get("last_name")
    email      = cust_info.get("email")
    active     = cust_info.get("active", 1)

    address     = cust_info.get("address")
    address2    = cust_info.get("address2")  # optional
    district    = cust_info.get("district")
    city        = cust_info.get("city")
    postal_code = cust_info.get("postal_code")
    phone       = cust_info.get("phone")

    with connecter.connect(**DB_CONFIG) as connection:
        with connection.cursor() as cursor:
           
            cursor.execute(
                "SELECT city_id FROM city WHERE city=%s AND country_id=103 LIMIT 1",
                (city,),
            )
            row = cursor.fetchone()
            if row:
                city_id = row[0]
            else:
                cursor.execute(
                    "INSERT INTO city (city, country_id) VALUES (%s, 103)",
                    (city,),
                )
                city_id = cursor.lastrowid

            cursor.execute(sql_customer, (first_name, last_name, email, active, customer_id))
            cursor.execute(sql_address, (address, address2, district, city_id, postal_code, phone, customer_id))

        connection.commit()

    return {"updated_customer_id": customer_id}

# •    As a user I want to be able to view customer details and see their past and present rental history
# •    As a user I want to be able to indicate that a customer has returned a rented movie 
# •    As a user I want to be able to rent a film out to a customer


def customer_rental_and_return_history(cust_id: int):
    sql = """
        SELECT
            c.customer_id,
            CONCAT(c.first_name, ' ', c.last_name) AS customer_name,
            c.email,
            c.active,
            r.rental_id,
            r.rental_date,
            r.return_date,
            i.inventory_id,
            f.film_id,
            f.title
        FROM customer AS c
        LEFT JOIN rental AS r
            ON r.customer_id = c.customer_id
        LEFT JOIN inventory AS i
            ON i.inventory_id = r.inventory_id
        LEFT JOIN film AS f
            ON f.film_id = i.film_id
        WHERE c.customer_id = %s
        ORDER BY r.rental_date DESC;
    """
    with connecter.connect(**DB_CONFIG) as connection:
        with connection.cursor(dictionary=True) as cursor:
            cursor.execute(sql, (cust_id,))  
            return cursor.fetchall()


def customer_return_a_film(cust_id: int, inventory_id: int) -> bool:
    sql = """
        UPDATE rental
        SET return_date = NOW(), last_update = NOW()
        WHERE customer_id = %s
          AND inventory_id = %s
          AND return_date IS NULL
        ORDER BY rental_date DESC
        LIMIT 1;
    """
    try:
        with connecter.connect(**DB_CONFIG) as connection:
            with connection.cursor() as cursor:
                cursor.execute(sql, (cust_id, inventory_id))
                ok = cursor.rowcount == 1
            connection.commit()
        return ok
    except Exception as e:
        print("customer_return_a_film failed:", e)
        return False


def customer_rent_a_film(cust_id: int, inventory_id: int, staff_id: int = 1) -> dict:
    try:
        with connecter.connect(**DB_CONFIG) as connection:
            with connection.cursor(dictionary=True) as cursor:
                connection.start_transaction()

                # Customer must exist + be active
                cursor.execute(
                    "SELECT active FROM customer WHERE customer_id=%s FOR UPDATE;",
                    (cust_id,)
                )
                cust = cursor.fetchone()
                if not cust:
                    connection.rollback()
                    return {"ok": False, "error": "Customer not found."}
                if cust["active"] != 1:
                    connection.rollback()
                    return {"ok": False, "error": "Customer is not active."}

                # Inventory must exist
                cursor.execute(
                    "SELECT inventory_id FROM inventory WHERE inventory_id=%s FOR UPDATE;",
                    (inventory_id,)
                )
                inv = cursor.fetchone()
                if not inv:
                    connection.rollback()
                    return {"ok": False, "error": "Inventory item not found."}

                # Inventory must not be currently rented out
                cursor.execute(
                    """
                    SELECT rental_id
                    FROM rental
                    WHERE inventory_id=%s AND return_date IS NULL
                    LIMIT 1
                    FOR UPDATE;
                    """,
                    (inventory_id,)
                )
                if cursor.fetchone():
                    connection.rollback()
                    return {"ok": False, "error": "Inventory item is currently rented out."}

                cursor.execute(
                    """
                    INSERT INTO rental (rental_date, inventory_id, customer_id, staff_id, last_update)
                    VALUES (NOW(), %s, %s, %s, NOW());
                    """,
                    (inventory_id, cust_id, staff_id)
                )
                rental_id = cursor.lastrowid

                connection.commit()
                return {"ok": True, "rental_id": rental_id}

    except Exception as e:
        try:
            connection.rollback()
        except Exception:
            pass
        return {"ok": False, "error": str(e)}