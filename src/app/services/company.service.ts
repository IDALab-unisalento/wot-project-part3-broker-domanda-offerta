import { Observable } from 'rxjs';
import { Company } from './../models/company';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'  })
};


@Injectable({
  providedIn: 'root'
})
export class CompanyService {


  constructor(private http: HttpClient, private router: Router) { }

  getByCompanyIdEndPoint = 'http://localhost:8080/company/get';
  getAllEndPoint = 'http://localhost:8080/company/getAll';
  getAllURL='http://localhost:8080/company/getAll';
  saveURL='http://localhost:8080/company/save';
  deleteURL = 'http://localhost:8080/company/remove'
  getDisabledEndPoint = 'http://localhost:8080/company/getDisabled'


  getALL(): Observable<Company[]>{
      return this.http.get<Company[]>(this.getAllURL);
  }

  save(comp: Company): Observable<Company>{
    return this.http.post<Company>(this.saveURL,comp,httpOptions);
  }

  getById(id: number): Observable<Company>{
    return this.http.get<Company>(this.getByCompanyIdEndPoint+'/'+id);}

    getAll():Observable<Company[]>{
      return this.http.get<Company[]>(this.getAllEndPoint);}

      delete(companyId : number): Observable<Company>{
        return this.http.delete<Company>(this.deleteURL + '/' + companyId, httpOptions );
      }

      getDisabled(isDisabled : boolean) : Observable<Company[]>{

        return this.http.get<Company[]>(this.getDisabledEndPoint+'/'+isDisabled);

      }
    }
