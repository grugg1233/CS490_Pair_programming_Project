export interface FilmData {
  film_id: number;
  title: string;
  category: string;
  count: number;
}

export interface ActorData {
  actor_id: number;
  first_name: string;
  last_name: string;
  store_id: number;
  address: string;
  count: number;
}


export interface ActorMovies {
  actor_id: number;
  title: string;
  rental_count: number;
}