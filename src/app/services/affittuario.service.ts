import { Observable } from 'rxjs';
import { Affittuario } from './../models/affittuario';
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
export class AffittuarioService {

  constructor(private http:HttpClient, private router: Router) { }

  getDisabledEndPoint = 'http://localhost:8080/affittuario/getDisabled'
  getByIdEndPoint = 'http://localhost:8080/affittuario/get'
  getAllEndPoint = 'http://localhost:8080/affittuario/getAll'
  saveURL='http://localhost:8080/affittuario/save';


  getById(id : number) : Observable<Affittuario>{

    return this.http.get<Affittuario>(`${this.getByIdEndPoint}/${id}`);

  }

  getDisabled(isDisabled : boolean) : Observable<Affittuario[]>{

    return this.http.get<Affittuario[]>(this.getDisabledEndPoint+'/'+isDisabled);

  }

  getALL(): Observable<Affittuario[]>{
    return this.http.get<Affittuario[]>(this.getAllEndPoint);
}


save(affittuario: Affittuario): Observable<Affittuario>{
  return this.http.post<Affittuario>(this.saveURL,affittuario,httpOptions);
}

}

