export interface FilmData {
  film_id: number | null;
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

export interface CustModalData {
    first_name: string;
    last_name: string; 
    email: string; 
    address: string; 
    city: string;
    country: string; 
    phone: string; 
}

export const genres: Genre[] = [
  { id: "0", name: "All" },
  { id: "1", name: "Action" },
  { id: "2", name: "Animation" },
  { id: "3", name: "Children" },
  { id: "4", name: "Classics" },
  { id: "5", name: "Comedy" },
  { id: "6", name: "Documentary" },
  { id: "7", name: "Drama" },
  { id: "8", name: "Family" },
  { id: "9", name: "Foreign" },
  { id: "10", name: "Games" },
  { id: "11", name: "Horror" },
  { id: "12", name: "Music" },
  { id: "13", name: "New" },
  { id: "14", name: "Sci-Fi" },
  { id: "15", name: "Sports" },
  { id: "16", name: "Travel" },
];

