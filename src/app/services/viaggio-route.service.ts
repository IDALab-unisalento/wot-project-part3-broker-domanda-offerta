import { catchError } from 'rxjs/operators';
import { ViaggioRoute } from './../models/viaggio-route';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Vector } from '../models/vector';
import { Route } from '../models/route';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
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
  getByViaggioIdAndRouteIdEndPoint = 'http://localhost:8080/viaggioRoute/getByViaggioIdAndRouteId'
  getByViaggioIdEndPoint = 'http://localhost:8080/viaggioRoute/getByViaggioId'
  getByRouteIdEndPoint="http://localhost:8080/viaggioRoute/getByRouteId"
  updateCapacityViaggioRouteEndPoint="http://localhost:8080/viaggioRoute/update"

  updateCapacity(newCapacity: number, viaggioRouteId: number): Observable<number>{
    return this.http.get<any>(this.updateCapacityViaggioRouteEndPoint+"/"+newCapacity+"/"+viaggioRouteId);
  }

  getById(id : number): Observable<ViaggioRoute>{

    return this.http.get<ViaggioRoute>(`${this.getByIdEndPoint}/${id}`) .pipe(
      catchError(
       (error:HttpErrorResponse)=>{
        if(error.status==404)this.router.navigateByUrl("/notFound")
        return throwError("User Not Found Exception Verified");
       }
      )

    );
  }

  getByRouteId(routeId:number): Observable<ViaggioRoute[]>{
    return this.http.get<ViaggioRoute[]>(this.getByRouteIdEndPoint+"/"+routeId);
  }

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
    return this.http.get<ViaggioRoute>(this.getByViaggioIdAndRouteIdEndPoint+'/'+vectorId+'/'+routeId);
  }

  getByViaggioId(viaggioId : number) : Observable<ViaggioRoute[]>{
    return this.http.get<ViaggioRoute[]>(this.getByViaggioIdEndPoint+'/'+viaggioId);
  }

}
