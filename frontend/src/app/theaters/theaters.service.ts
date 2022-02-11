import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TheaterCreateDto } from './theater-create-dto';
import { Theater } from './theater.model';

@Injectable({
  providedIn: 'root'
})
export class TheatersService {

  private url:string = environment.apiUrl + "theaters";
  constructor(private http: HttpClient) { }
  
  getTheaters():Observable<Theater[]>{
    return this.http.get<Theater[]>(this.url);
  }

  createTheaters(theater:TheaterCreateDto):Observable<any>{ 
    return this.http.post<any>(this.url, theater);
  }

  getTheater(id:number):Observable<Theater>{
    return this.http.get<Theater>(this.url + "/" + id);
  }

  updateTheater(id:number,theater:TheaterCreateDto){
    return this.http.put(this.url + "/" + id, theater);
  }

  deleteTheater(id:number){
    return this.http.delete(this.url + "/" + id);
  }

}
