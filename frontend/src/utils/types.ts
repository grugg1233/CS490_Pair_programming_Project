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

export interface ActorWithMovies extends ActorData {
  movies: ActorMovies[];
}
export interface FilmDetails {
  description: string;
  length: number;
  name: string; //language
  rating: string; 
  release_year: number;
  rental_duration: number; 
  rental_rate: string; 
  title: string; //movie title
  
}

export interface filmActors {
  first_name: string; 
  last_nmae: string; 
}