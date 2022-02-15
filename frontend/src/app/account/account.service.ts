import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationResponse, UserCredentials, UserDto } from './account.models';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

 private url:string = environment.apiUrl+"accounts";

 private readonly tokenKey = 'token';
  private readonly expirationTokenKey = 'token-expiration';

  private readonly roleField = "role";
  


  constructor(private http:HttpClient) { }



  public isAuthenticated():boolean{
    const token = localStorage.getItem(this.tokenKey);

    if (!token) return false;
    const expiration:Date | any = localStorage.getItem(this.expirationTokenKey);
    const expirationDate = new Date(expiration);

    if (expirationDate <= new Date())
    {
      this.logout();
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem(this.expirationTokenKey);
      return false;
    }   
    return true;
    

  }

  getFieldFromJWT(field: string) { 

    const token = localStorage.getItem(this.tokenKey);
    if (!token) return '';

    const dataToken = JSON.parse(atob(token.split('.')[1]));
    return dataToken[field];
    
    
  }
  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.expirationTokenKey);

  }

  getRole():string{
    return this.roleField;
  }


  getUsers(page: number, perPage: number): Observable<any>{
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('perPage', perPage.toString());
    
    return this.http.get<UserDto[]>(this.url, {observe:'response', params: params });
  }

  createAdmin(userId:string) {
    const headers = new HttpHeaders('Content-Type: application/json');
    return this.http.post(this.url+"/createAdmin",JSON.stringify(userId),{headers:headers});


  }
  
    

  removeAdmin(userId:string) {
    const headers = new HttpHeaders('Content-Type: application/json');
    return this.http.post(this.url+"/removeAdmin",JSON.stringify(userId),{headers:headers});


    }




  register(credentials:UserCredentials):Observable<AuthenticationResponse>{
    return this.http.post<AuthenticationResponse>(this.url+"/create",credentials);
  }
  login(credentials:UserCredentials):Observable<AuthenticationResponse>{
    return this.http.post<AuthenticationResponse>(this.url+"/login",credentials);
  }

  saveToken(authenticationResponse:AuthenticationResponse){
    localStorage.setItem(this.tokenKey,authenticationResponse.token);
    localStorage.setItem(this.expirationTokenKey,authenticationResponse.expiration.toString());


  }

  getToken() {
    return localStorage.getItem(this.tokenKey);

  }
}
