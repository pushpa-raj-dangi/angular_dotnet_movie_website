import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { formatDateFormData } from '../utils/utils';
import { ActorModel } from './actor.model';

@Injectable({
  providedIn: 'root',
})
export class ActorsService {
  private url = environment.apiUrl + 'actors';
  constructor(private httpClient: HttpClient) {}

  create(actor: ActorModel) {


    const formData = this.buildFormData(actor);
    formData.forEach(function(x){
        console.log(x);

    })
    return this.httpClient.post(this.url, formData);
  }

  getAll():Observable<ActorModel[]>{
    return this.httpClient.get<ActorModel[]>(this.url);
  }

  getById(id:number):Observable<ActorModel>{
    return this.httpClient.get<ActorModel>(this.url+"/"+id);
  }



  private buildFormData(actor: ActorModel): FormData {
    const formData = new FormData();

    formData.append('name', actor.name);

    if (actor.biography){
      formData.append('biography', actor.biography);
    }

    if (actor.dateOfBirth){
      formData.append('dateOfBirth', formatDateFormData(actor.dateOfBirth));
    }

    if (actor.image){
      formData.append('picture', actor.image);
    }

    return formData;
  }
}
