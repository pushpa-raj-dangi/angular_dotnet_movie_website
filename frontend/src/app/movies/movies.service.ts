import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
  
export class MoviesService {

  private url = environment.apiUrl + "movies";
  constructor(private http: HttpClient) { }
  
  getAllMovies() {
    return this.http.get(this.url);
  }
}
