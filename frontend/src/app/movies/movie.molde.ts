import { ActorsMovieDto } from './../actors/actor.model';
import { Theater } from './../theaters/theater.model';
import { GenreDto } from './../genres/genre.model';
export interface MovieCreateDto {
  name: string;
  summary: string;
  inTheater: boolean;
  releaseDate: Date;
  poster: File;
  trailer: string;
  genresIds: number[];
  theatersIds: number[];
  actors:ActorsMovieDto[];
}

export interface movieDto {
  name: string;
  summary: string;
  inTheaters: boolean;
  releaseDate: Date;
  poster: string;
  trailer: string;
  genres: GenreDto[];
   theaters: Theater[];
  actors: ActorsMovieDto[];
  userVote: number;
  
}

export interface MoviePostGetDto
{
  genres: GenreDto[];
  theaters:Theater[];

}

export interface MoviePutDto{
  movie: movieDto;
  selectedGenre: GenreDto[];
  nonSelectedGenre: GenreDto[];
  selectedTheater: Theater[];
  nonSelectedTheater: Theater[];
  actors: ActorsMovieDto[];
  

}


export interface HomeDto{
  inTheaters: movieDto[];
  upcomings: movieDto[];
}