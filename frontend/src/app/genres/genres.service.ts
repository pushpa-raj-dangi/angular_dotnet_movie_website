import { GenreDto } from 'src/app/genres/genre.model';
import { GenreGetDto } from './genre.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenresService {
 private url : string = environment.apiUrl+"genres";

  constructor(private httpClient:HttpClient) { }

  getGenres():Observable<GenreGetDto[]>{
      return this.httpClient.get<GenreGetDto[]>(this.url);
  }

  createGenre(genre:GenreDto){
    return this.httpClient.post(this.url,genre);
  }
  getGenre(id:number){
    return this.httpClient.get(this.url + "/" +id);
  }

  editGenre(data:any){
    return this.httpClient.put(data,this.url);
  }

  deleteGenre(id:number){
    return this.httpClient.delete(this.url+"/"+id);
  }


}
