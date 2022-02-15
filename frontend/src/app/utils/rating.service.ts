import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private url = environment.apiUrl + 'ratings';
  constructor(private http: HttpClient) { }
  
  public rate(movieId: number, rating: number) {
    return this.http.post(this.url, { movieId, rating });
  }
}
