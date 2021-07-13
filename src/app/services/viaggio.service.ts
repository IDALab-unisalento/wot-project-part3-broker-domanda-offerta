import { Viaggio } from 'src/app/models/viaggio';
import { Observable } from 'rxjs';
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
export class ViaggioService {

  constructor(private http:HttpClient, private router: Router) { }


  getAllEndPoint = 'http://localhost:8080/viaggio/getAll'
  routeByIdEndPoint = 'http://localhost:8080/viaggio/get'
  getByVectorIdEndPoint = 'http://localhost:8080/viaggio/getByVector'
  saveEndPoint = 'http://localhost:8080/viaggio/save'

  getAll(): Observable<Viaggio[]>{
    return this.http.get<Viaggio[]>(this.getAllEndPoint);
}

getById(id : number): Observable<Viaggio>{

  return this.http.get<Viaggio>(`${this.routeByIdEndPoint}/${id}`);
}

getByVectorId(id : number): Observable<Viaggio[]>{

  return this.http.get<Viaggio[]>(`${this.getByVectorIdEndPoint}/${id}`);
}


save(viaggio : Viaggio) : Observable<Viaggio>{

  return this.http.post<Viaggio>(this.saveEndPoint, viaggio, httpOptions);

}

}
