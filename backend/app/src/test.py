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

def return_actors(s_id: int):
    with connecter.connect(**DB_CONFIG) as connection:
        with connection.cursor() as cursor:
            cursor.execute(f"""
                select 
                    a.actor_id,
                    a.first_name,
                    a.last_name, 
                    s.store_id,
                    addr.address,
                    COUNT(*) as cnt
                from 
                    actor as a
                    inner join film_actor fa 
                        on a.actor_id  = fa.actor_id 
                    inner join film as f 
                        on fa.film_id  = f.film_id
                    inner join inventory as i
                        on f.film_id  = i .film_id 
                    inner join store as s 
                        on i.store_id  = s.store_id
                    inner join address as addr 
                        on s.address_id  = addr.address_id 
                where s.store_id  = {s_id}
                group by 
                    s.store_id, a.actor_id, a.first_name, a.last_name
                order by
                    cnt desc 
                    limit 5
            """)
            return cursor.fetchall()
