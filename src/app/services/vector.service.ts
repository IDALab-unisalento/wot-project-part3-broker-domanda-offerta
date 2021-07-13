import { Vector } from './../models/vector';
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
export class VectorService {

  constructor(private http:HttpClient, private router: Router) { }

  getAllEndPoint = 'http://localhost:8080/vector/getAll'
  vectorByIdEndPoint = 'http://localhost:8080/vector/get'
  saveEndPoint = 'http://localhost:8080/vector/save'
  getByTargaEndPoint = 'http://localhost:8080/vector/getByLicensePlate'

  getAll(): Observable<Vector[]>{
    return this.http.get<Vector[]>(this.getAllEndPoint);
}

getById(id : number): Observable<Vector>{

  return this.http.get<Vector>(`${this.vectorByIdEndPoint}/${id}`);
}



save(vector : Vector) : Observable<Vector>{

  return this.http.post<Vector>(this.saveEndPoint, vector, httpOptions);

}

getByTarga(targa : string) : Observable<Vector>{
  return this.http.get<Vector>(`${this.getByTargaEndPoint}/${targa}`);

}


}
