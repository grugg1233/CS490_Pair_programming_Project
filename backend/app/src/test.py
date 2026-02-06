import mysql.connector as connecter

DB_CONFIG = dict(
    user="root",
    password="root",
    host="db",     
    port=3306,
    database="sakila",
)

def return_films():
    with connecter.connect(**DB_CONFIG) as connection:
        with connection.cursor() as cursor:
            cursor.execute("""
                select 
                    i.film_id,
                    f.title,
                    c.name,
                    COUNT(*) as cnt 
                from rental as r
                inner join inventory as i on r.inventory_id = i.inventory_id 
                inner join film as f on i.film_id = f.film_id
                inner join film_category as fc on f.film_id = fc.film_id
                inner join category as c on fc.category_id = c.category_id
                group by i.film_id, f.title, c.name
                order by cnt desc
                limit 5;
            """)
            return cursor.fetchall()

def return_actors():
    with connecter.connect(**DB_CONFIG) as connection:
        with connection.cursor() as cursor:
            cursor.execute("""
                select 
                    i.film_id,
                    f.title,
                    COUNT(*) as cnt 
                from rental as r
                inner join inventory as i on r.inventory_id = i.inventory_id 
                inner join film as f on i.film_id = f.film_id
                inner join film_actor as fa on f.film_id  = fa.film_id 
                where fa.actor_id =
                    (
                        select fa2.actor_id
                        from film_actor as fa2
                        group by fa2.actor_id
                        order by COUNT(*) desc
                        limit 1
                    )
                group by i.film_id, f.title
                order by cnt desc
                limit 5;
            """)
            return cursor.fetchall()
