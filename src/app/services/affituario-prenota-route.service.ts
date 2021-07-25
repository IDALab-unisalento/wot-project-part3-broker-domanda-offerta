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
  getByUserID="http://localhost:8080/affittuarioPrenotaViaggioRoute/getByAffittuarioId"
  removeBooking="http://localhost:8080/affittuarioPrenotaViaggioRoute/remove"
  getByAffittuarioIdandViaggioRouteId="http://localhost:8080/affittuarioPrenotaViaggioRoute/getByAffittuarioIdAndViaggioRouteId"

  alreadyBooked(idAffituario: number, idViaggioRoute: number): Observable<AffittuarioPrenotaViaggioRoute>{
    return this.http.get<AffittuarioPrenotaViaggioRoute>(this.getByAffittuarioIdandViaggioRouteId+"/"+idAffituario+"/"+idViaggioRoute);
  }

  getByAffittuario(id: number):Observable<AffittuarioPrenotaViaggioRoute[]>{
    return this.http.get<AffittuarioPrenotaViaggioRoute[]>(this.getByUserID+"/"+id,httpOptions)
  }

  saveBooking(toBook: AffittuarioPrenotaViaggioRoute): Observable<AffittuarioPrenotaViaggioRoute>{
    return this.http.post<AffittuarioPrenotaViaggioRoute>(this.prenotaRouteEndPoint,toBook,httpOptions);
  }


  getByViaggioRouteId(viaggioRouteId : number) : Observable<AffittuarioPrenotaViaggioRoute[]>{
    return this.http.get<AffittuarioPrenotaViaggioRoute[]>(this.getByViaggioRouteIdEndPoint+'/'+viaggioRouteId);
  }

  getAll(): Observable<AffittuarioPrenotaViaggioRoute[]>{
    return this.http.get<AffittuarioPrenotaViaggioRoute[]>(this.getAllEndPoint);
}
  deleteBooking(id: number):Observable<any>{
    return this.http.delete<any>(this.removeBooking+"/"+id, httpOptions);

  }

}
