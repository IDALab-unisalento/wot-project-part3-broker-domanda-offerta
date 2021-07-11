import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Viaggio } from '../models/viaggio';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'  })
};


@Injectable({
  providedIn: 'root'
})
export class ViaggioService {

  constructor(private http:HttpClient, private router: Router) { }


  getAllEndPoint = 'http://localhost:8080/viaggio/getAll'
  routeByIdEndPoint = 'http://localhost:8080/viaggio/get'
  getByVectorIdEndPoint = 'http://localhost:8080/viaggio/getByVector'

  getAll(): Observable<Viaggio[]>{
    return this.http.get<Viaggio[]>(this.getAllEndPoint);
}

getById(id : number): Observable<Viaggio>{

  return this.http.get<Viaggio>(`${this.routeByIdEndPoint}/${id}`);
}

getByVectorId(id : number): Observable<Viaggio[]>{

  return this.http.get<Viaggio[]>(`${this.getByVectorIdEndPoint}/${id}`);
}

}
