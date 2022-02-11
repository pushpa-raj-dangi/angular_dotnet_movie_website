import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { MoviePostGetDto } from './movie.molde';

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
}
