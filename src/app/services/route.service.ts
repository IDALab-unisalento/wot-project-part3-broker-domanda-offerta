import { Observable } from 'rxjs';
import { Route } from './../models/route';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'  })
};


@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor(private http:HttpClient, private router: Router) { }


  getAllEndPoint = 'http://localhost:8080/route/getAll'
  routeByIdEndPoint = 'http://localhost:8080/route/get'


  getAll(): Observable<Route[]>{
    return this.http.get<Route[]>(this.getAllEndPoint);
}

getById(id : number): Observable<Route>{

  return this.http.get<Route>(`${this.routeByIdEndPoint}/${id}`);
}

}
