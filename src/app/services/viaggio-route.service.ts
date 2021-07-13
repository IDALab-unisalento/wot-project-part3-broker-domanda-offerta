import { ViaggioRoute } from './../models/viaggio-route';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Vector } from '../models/vector';
import { Route } from '../models/route';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'  })
};

@Injectable({
  providedIn: 'root'
})
export class ViaggioRouteService {

  route : Route = {} as Route;
  vector : Vector = {} as Vector;
  viaggioRoute : ViaggioRoute = {} as ViaggioRoute;

  constructor(private http:HttpClient, private router: Router) { }

  getByIdEndPoint = 'http://localhost:8080/viaggioRoute/get'
  getAllEndPoint = 'http://localhost:8080/viaggioRoute/getAll'
  saveEndPoint = 'http://localhost:8080/viaggioRoute/save'
  deleteEndPoint = 'http://localhost:8080/viaggioRoute/remove'
  getByVectorIdAndRouteIdEndPoint = 'http://localhost:8080/viaggioRoute/getByViaggioIdAndRouteId'
  getByVectorIdEndPoint = 'http://localhost:8080/viaggioRoute/getByViaggioId'


  getAll(): Observable<ViaggioRoute[]>{
    return this.http.get<ViaggioRoute[]>(this.getAllEndPoint);
  }


  save(viaggioRoute : ViaggioRoute) : Observable<ViaggioRoute>{

    return this.http.post<ViaggioRoute>(this.saveEndPoint, viaggioRoute, httpOptions);

  }

  delete(vectorRoute : ViaggioRoute): Observable<ViaggioRoute>{
    return this.http.delete<ViaggioRoute>(this.deleteEndPoint + '/' + vectorRoute.id, httpOptions );
  }

  getByVectorIdAndRouteId(vectorId : number, routeId : number) : Observable<ViaggioRoute>{
    return this.http.get<ViaggioRoute>(this.getByVectorIdAndRouteIdEndPoint+'/'+vectorId+'/'+routeId);
  }

  getByViaggioId(viaggioId : number) : Observable<ViaggioRoute[]>{
    return this.http.get<ViaggioRoute[]>(this.getByVectorIdEndPoint+'/'+viaggioId);
  }



}
