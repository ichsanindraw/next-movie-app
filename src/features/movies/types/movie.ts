export type MovieListItem = {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
};

export type SearchMovieResponse = {
  Search: MovieListItem[];
  totalResults: string;
  Response: "True" | "False";
  Error?: string;
};

type MovieRating = {
  Source: string;
  Value: string;
};

export type MovieDetailResponse = {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: MovieRating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: "movie" | "series" | "episode";
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Error?: string;
};

export type MovieDetailSuccess = MovieDetailResponse & {
  Response: "True";
};

export type MovieDetailError = {
  Response: "False";
  Error: string;
};

export type MovieDetailResult = MovieDetailSuccess | MovieDetailError;
