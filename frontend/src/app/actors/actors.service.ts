import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { formatDateFormData } from '../utils/utils';
import { ActorDto, ActorModel } from './actor.model';

@Injectable({
  providedIn: 'root',
})
export class ActorsService {
  private url = environment.apiUrl + 'actors';
  constructor(private httpClient: HttpClient) {}

  create(actor: ActorModel) {
    const formData = this.buildFormData(actor);
    formData.forEach(function (x) {
      console.log(x);
    });
    return this.httpClient.post(this.url, formData);
  }

  getAll(page: number, perPage: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('perPage', perPage);
    return this.httpClient.get<ActorModel[]>(this.url, {
      observe: 'response',
      params,
    });
  }
  delete(id: number) {
    return this.httpClient.delete(this.url + '/' + id);
  }

  getById(id: number): Observable<ActorDto> {
    return this.httpClient.get<ActorDto>(this.url + '/' + id);
  }

  edit(id: number, actor: ActorModel) {
    const formData = this.buildFormData(actor);

    return this.httpClient.put(this.url + '/' + id, formData);
  }

  private buildFormData(actor: ActorModel): FormData {
    const formData = new FormData();

    formData.append('name', actor.name);

    if (actor.biography) {
      formData.append('biography', actor.biography);
    }

    if (actor.dateOfBirth) {
      formData.append('dateOfBirth', formatDateFormData(actor.dateOfBirth));
    }

    if (actor.image) {
      formData.append('picture', actor.image);
    }

    return formData;
  }
}
