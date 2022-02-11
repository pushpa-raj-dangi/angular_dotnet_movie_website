import { ActorsMovieDto } from './../actors/actor.model';
import { Theater } from './../theaters/theater.model';
import { GenreDto } from './../genres/genre.model';
export interface MovieCreateDto {
  name: string;
  summary: string;
  inTheaters: boolean;
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
  actors:ActorsMovieDto[];
}

export interface MoviePostGetDto
{
  genres: GenreDto[];
  theaters:Theater[];

}
