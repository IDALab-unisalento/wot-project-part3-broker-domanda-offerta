import { User } from './../models/user';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'  })
  };

  constructor(private http:HttpClient, private router: Router) { }

  user : User = {} as User;

  enableUserByIdEndPoint = 'http://localhost:8080/administrator/enableUserById';

  enableUserById(id : number){
    this.user.id = id;
    return this.http.post<User>(this.enableUserByIdEndPoint,this.user, this.httpOptions);
  }

}
