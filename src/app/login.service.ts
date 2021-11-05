import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';
import { User } from './user.model';
import { tokenize } from '@angular/compiler/src/ml_parser/lexer';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  tokenName:string = "token";

  login(userName:string, password:string):Promise<string>
  {
    return this.http.get<string>("https://localhost:5001/api/User/Login?username="+encodeURIComponent(userName)+"&password="+password).toPromise();
  }

  //Checks if the token is legitimate and still valid. If not it returns a empty User object.
  loginAuthToken():Promise<User>
  {
    return this.http.get<User>("https://localhost:5001/api/User/LoginAuthToken?token="+ this.getToken()).toPromise()
  }

  setToken(token:string)
  {
    localStorage.setItem(this.tokenName,token[this.tokenName]);
  }

  getToken():string
  {
    return localStorage.getItem(this.tokenName)
  }

  removeToken()
  {
    localStorage.removeItem(this.tokenName);
  }

 






}
