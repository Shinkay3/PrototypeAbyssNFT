import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user.model';
import { Observable, throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';





@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  checkUserName(newUserName:string, newUserNumber:string):Promise<boolean>
  {
    var a = this.http.get<boolean>('https://localhost:5001/api/User/CheckUserName?newusername=' + newUserName + '&newusernumber='+ newUserNumber).toPromise();
    return a;
  }

  checkEmail(email:string):Promise<boolean>
  {
    var a = this.http.get<boolean>('https://localhost:5001/api/User/CheckEmail?email=' + email).toPromise();
    return a;
  }

  createUser(user:User): Promise<User>
  {
    // user = new User();
    return this.http.post<User>("https://localhost:5001/api/User/CreateUser",user, {
      headers : {
        'Content-Type': 'application/json'
      }
  }).toPromise()
  }

}
