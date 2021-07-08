
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../models/user';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

   user : User = {} as User;


  constructor(private http:HttpClient, private router: Router) { }

  userByIdEndPoint = 'http://localhost:8080/user/get'
  getAllUsersEndPoint = 'http://localhost:8080/user/getAll'
  getByUsernameAndPasswordURL="http://localhost:8080/user/getByUsernameAndPassword";
  getUserByUsernameURL="http://localhost:8080/user/getByUsername"
  deleteUserByIdEndPoint = 'http://localhost:8080/user/remove';



  login(username:string, psw:string): Observable<User>{

     this.user.username=username;
      this.user.password=psw;

      return this.http.post<User>(this.getByUsernameAndPasswordURL,this.user,httpOptions)
      .pipe(
        catchError(
         (error:HttpErrorResponse)=>{
          return throwError("User Not Found Exception Verified");
         }
        )

      )


  }

  getUserById(id : number): Observable<User>{

    return this.http.get<User>(`${this.userByIdEndPoint}/${id}`);
  }



  getUserByUserName(username:string):Observable<User>{
    return this.http.get<User>(this.getUserByUsernameURL+"/"+username).pipe(
      catchError(
       (error:HttpErrorResponse)=>{
        if(error.status==404)this.router.navigateByUrl("/errors")
        return throwError("User Not Found Exception Verified");
       }
      )
    )
  }

  deleteById(id : number){
    this.user.id = id;

    return this.http.delete<User>(this.deleteUserByIdEndPoint+'/'+id);
  }

  getAll() : Observable<User[]>{
    return this.http.get<User[]>(this.getAllUsersEndPoint);
  }

}
