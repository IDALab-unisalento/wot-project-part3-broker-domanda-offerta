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
  getByCitiesEndPoint = 'http://localhost:8080/route/getByStartCityAndEndCity'
  saveEndPoint = 'http://localhost:8080/route/save'
  getAllRoutesOfViaggioIdEndPoint="http://localhost:8080/route/getRoutes"


  findAllRoutes(viaggioId: Number): Observable<Route[]>{
    return this.http.get<Route[]>(this.getAllRoutesOfViaggioIdEndPoint+"/"+viaggioId)
  }

  getAll(): Observable<Route[]>{
    return this.http.get<Route[]>(this.getAllEndPoint);
}

getById(id : number): Observable<Route>{

  return this.http.get<Route>(`${this.routeByIdEndPoint}/${id}`);
}


save(route : Route) : Observable<Route>{

  return this.http.post<Route>(this.saveEndPoint, route, httpOptions);

}

getByCities(startCity : string, endCity : string): Observable<Route>{

  return this.http.get<Route>(`${this.getByCitiesEndPoint}/${startCity}/${endCity}`);
}

}
