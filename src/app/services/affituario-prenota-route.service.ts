import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AffittuarioPrenotaViaggioRoute } from '../models/affittuario-prenota-viaggio-route';



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'  })
};

@Injectable({
  providedIn: 'root'
})

export class AffituarioPrenotaRouteService {

  constructor(private http:HttpClient) { }

  prenotaRouteEndPoint="http://localhost:8080/affittuarioPrenotaViaggioRoute/save";
  getByViaggioRouteIdEndPoint = 'http://localhost:8080/affittuarioPrenotaViaggioRoute/getByViaggioRouteId'
  getAllEndPoint = 'http://localhost:8080/affittuarioPrenotaViaggioRoute/getAll'

  saveBooking(toBook: AffittuarioPrenotaViaggioRoute): Observable<AffittuarioPrenotaViaggioRoute>{
    return this.http.post<AffittuarioPrenotaViaggioRoute>(this.prenotaRouteEndPoint,toBook,httpOptions);
  }


  getByViaggioRouteId(viaggioRouteId : number) : Observable<AffittuarioPrenotaViaggioRoute[]>{
    return this.http.get<AffittuarioPrenotaViaggioRoute[]>(this.getByViaggioRouteIdEndPoint+'/'+viaggioRouteId);
  }

  getAll(): Observable<AffittuarioPrenotaViaggioRoute[]>{
    return this.http.get<AffittuarioPrenotaViaggioRoute[]>(this.getAllEndPoint);
}
}
