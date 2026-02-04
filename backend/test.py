# Video used: https://youtu.be/WBqHr2kPc_A?si=FKfVQMptaeODTMCE

import mysql.connector as connecter


def return_films():
    connection = connecter.connect(
        user="root", password="root", host="localhost", port="3306", database="sakila"
    )
    cursor = connection.cursor()

    cursor.execute(
        """
        select 
            i.film_id,
            f.title,
            c.name,
            COUNT(*) as cnt 
        from 
            rental as r
            inner join inventory as i
                on r.inventory_id = i.inventory_id 
            inner join film as f
                on i.film_id = f.film_id
            inner join film_category as fc
                on f.film_id = fc.film_id
            inner join category as c
                on fc.category_id = c.category_id
        group by
            i.film_id, f.title, c.name
        order by
            cnt desc 
	    limit 5;	
        """
    )

    films = cursor.fetchall()

    connection.close()

    return films
