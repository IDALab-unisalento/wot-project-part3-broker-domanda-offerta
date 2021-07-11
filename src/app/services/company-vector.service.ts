import { CompanyVector } from './../models/company-vector';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Vector } from './../models/vector';
import { Company } from './../models/company';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'  })
};
@Injectable({
  providedIn: 'root'
})
export class CompanyVectorService {

  company : Company = {} as Company;
  vector : Vector = {} as Vector;
  companyVector : CompanyVector = {} as CompanyVector;

  constructor(private http:HttpClient, private router: Router) { }

  getByIdEndPoint = 'http://localhost:8080/companyVector/get'
  getAllEndPoint = 'http://localhost:8080/companyVector/getAll'
  saveEndPoint = 'http://localhost:8080/companyVector/save'
  deleteEndPoint = 'http://localhost:8080/companyVector/remove'
  getByCompanyIdAndVectorIdEndPoint = 'http://localhost:8080/companyVector/getByCompanyIdAndVectorId'
  getByCompanyIdEndPoint = 'http://localhost:8080/companyVector/getByCompanyId'

  getAll(): Observable<CompanyVector[]>{
    return this.http.get<CompanyVector[]>(this.getAllEndPoint);
  }


  save(companyId : number, vectorId : number) : Observable<CompanyVector>{

    this.companyVector.companyId = companyId;
    this.companyVector.vectorId = vectorId;

    return this.http.post<CompanyVector>(this.saveEndPoint, this.companyVector, httpOptions);

  }

  delete(companyVector : CompanyVector): Observable<CompanyVector>{
    return this.http.delete<CompanyVector>(this.deleteEndPoint + '/' + companyVector.id, httpOptions );
  }

  getByCompanyIdAndVectorId(companyId : number, vectorId : number) : Observable<CompanyVector>{
    return this.http.get<CompanyVector>(this.getByCompanyIdAndVectorIdEndPoint+'/'+companyId+'/'+vectorId);
  }

  getByCompanyId(companyId : number) : Observable<CompanyVector[]>{
    return this.http.get<CompanyVector[]>(this.getByCompanyIdEndPoint+'/'+companyId);
  }

}
