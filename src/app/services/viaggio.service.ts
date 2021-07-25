import { catchError } from 'rxjs/operators';
import { Viaggio } from 'src/app/models/viaggio';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
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
  getByCompanyIdEndPoint = 'http://localhost:8080/viaggio/getByCompany'
  saveEndPoint = 'http://localhost:8080/viaggio/save'
  deleteEndPoint = 'http://localhost:8080/viaggio/remove'

  getAll(): Observable<Viaggio[]>{
    return this.http.get<Viaggio[]>(this.getAllEndPoint);
}

getById(id : number): Observable<Viaggio>{

  return this.http.get<Viaggio>(`${this.routeByIdEndPoint}/${id}`)
  .pipe(
    catchError(
     (error:HttpErrorResponse)=>{
      if(error.status==404)this.router.navigateByUrl("/notFound")
      return throwError("User Not Found Exception Verified");
     }
    )

  )
}

getByVectorId(id : number): Observable<Viaggio[]>{

  return this.http.get<Viaggio[]>(`${this.getByVectorIdEndPoint}/${id}`);
}
getByCompanyId(id : number): Observable<Viaggio[]>{

  return this.http.get<Viaggio[]>(`${this.getByCompanyIdEndPoint}/${id}`);
}


delete(viaggioId : number): Observable<Viaggio>{
  return this.http.delete<Viaggio>(this.deleteEndPoint + '/' + viaggioId, httpOptions );
}

save(viaggio : Viaggio) : Observable<Viaggio>{

  return this.http.post<Viaggio>(this.saveEndPoint, viaggio, httpOptions);

}

}
