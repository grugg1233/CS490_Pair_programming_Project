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
  count: number; // rental count
}
