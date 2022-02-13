import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationResponse, UserCredentials } from './account.models';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

 private url:string = environment.apiUrl+"accounts";

 private tokenKey = 'token';
 private expirationTokenKey = 'token-expiration';


  constructor(private http:HttpClient) { }



  public isAuthenticated():boolean{
    return true;
  }

  getRole():string{
    return 'admin';
  }

  register(credentials:UserCredentials):Observable<AuthenticationResponse>{
    return this.http.post<AuthenticationResponse>(this.url+"/create",credentials);
  }

  saveToken(authenticationResponse:AuthenticationResponse){
    localStorage.setItem(this.tokenKey,authenticationResponse.token);
    localStorage.setItem(this.expirationTokenKey,authenticationResponse.expiration.toString());

  }
}
