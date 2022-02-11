import { Theater } from './../theaters/theater.model';
import { GenreDto } from './../genres/genre.model';
export interface movieCreateDto {
  name: string;
  summary: string;
  inTheaters: boolean;
  releaseDate: Date;
  poster: File;
  trailer: string;
}

export interface movieDto {
  name: string;
  summary: string;
  inTheaters: boolean;
  releaseDate: Date;
  poster: string;
  trailer: string;
}

export interface MoviePostGetDto
{
  genres: GenreDto[];
  theaters:Theater[];

}
