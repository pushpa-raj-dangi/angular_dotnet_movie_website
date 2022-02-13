import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { MoviePostGetDto, MovieCreateDto, movieDto, HomeDto, MoviePutDto } from './movie.molde';
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
  getAllMovies():Observable<HomeDto> {
    return this.http.get<HomeDto>(this.url);
  }


  getById(id: number): Observable<movieDto> {
    
    return this.http.get<movieDto>(`${this.url}/${id}`);

  }

  public filter(value:any):Observable<movieDto[] | any>{
      const params = new HttpParams({fromObject:value});
      return this.http.get<movieDto[] | any>(`${this.url}/filter`,{params,observe:'response'})
  }
  
  public create(movieCreateDto: MovieCreateDto): Observable<any>{
    const formData = this.BuildFormData(movieCreateDto);
    return this.http.post(this.url, formData);
  } 

  public putGet(id:number): Observable<MoviePutDto>{
    return this.http.get<MoviePutDto>(`${this.url}/putget/${id}`)
  }
  

  public delete(id: number) {
    return this.http.delete(this.url + id);
  }

  public edit(id:number,movieCreate:MovieCreateDto) {
    const formData = this.BuildFormData(movieCreate);
    return this.http.put(`${this.url}/putget/${id}`,formData);
  }

  

  private BuildFormData(movie: MovieCreateDto):FormData {
    const formData = new FormData();
    formData.append('name', movie.name);
    formData.append('summary', movie.summary);
    formData.append('trailer', movie.trailer);
    formData.append('inTheater', String(movie.inTheater));
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
