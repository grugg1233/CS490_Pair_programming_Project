export interface FilmData {
  film_id: number;
  title: string;
  category: string | null;
  count: number | null;
  rank: number; 
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
  last_name: string;
}

export interface AllCustomers {
  customer_id: number;
  first_name: string;
  last_name: string;
  email: string;
  address: string;
}

export type Genre = {
  id: string;
  name: string;
};

export interface Pagination {
  page: number;
  totalPages: number;
  canPrev: boolean;
  canNext: boolean;
  pageNumbers: number[];
  setPage: React.Dispatch<React.SetStateAction<number>>;
}