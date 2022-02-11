import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { MoviePostGetDto, MovieCreateDto, movieDto } from './movie.molde';
import { formatDateFormData } from '../utils/utils';

@Injectable({
  providedIn: 'root'
})

export class MoviesService {

  private url = environment.apiUrl + "movies";
  constructor(private http: HttpClient) { }

  postGet():Observable<MoviePostGetDto>{
    return this.http.get<MoviePostGetDto>(`${this.url}/postget`);
  }
  getAllMovies() {
    return this.http.get(this.url);
  }


  getById(id: number): Observable<movieDto> {
    
    return this.http.get<movieDto>(`${this.url}/${id}`);

  }

  
  public create(movieCreateDto: MovieCreateDto): Observable<any>{
    const formData = this.BuildFormData(movieCreateDto);
    return this.http.post(this.url, formData);
  } 

  private BuildFormData(movie: MovieCreateDto):FormData {
    const formData = new FormData();
    formData.append('name', movie.name);
    formData.append('summary', movie.summary);
    formData.append('trailer', movie.trailer);
    formData.append('inTheaters', String(movie.inTheaters));
    if (movie.releaseDate) {
      formData.append("releaseDate", formatDateFormData(movie.releaseDate));
    }
    if (movie.poster) {
      formData.append("poster", movie.poster);

    }
    formData.append("genresIds", JSON.stringify(movie.genresIds));
    formData.append("theatersIds", JSON.stringify(movie.theatersIds));
    formData.append("actors", JSON.stringify(movie.actors));

    return formData;
  }
}
