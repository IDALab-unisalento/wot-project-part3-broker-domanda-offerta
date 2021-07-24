import { Time } from '@angular/common';
import { Vector } from 'src/app/models/vector';
import { Route } from './route';
export interface Offer {

  vectorId : number;
  viaggioId : number;
  vectorType : string;
  vectorBrand : string;
  licensePlate : string;
  available ?: boolean;
  occupiedCapacity : number;
  startingCity : string;
  endingCity : string;
  startingDate : Date;
  endingDate : Date;
  routes : Route[];
  vector : Vector;
  length : number; // i Km
  lastDay : boolean //mi serve per segnarlo di giallo
  costoPerKm : number;
  initialLoad :number;
  startDate : Date ;
  endDate : Date ;
  startTime : Time ;
  endTime : Time;
  treatsCity : string[];
  startDates : Date[];
  startTimes : Time[];
  endDates : Date[];
  endTimes : Time[];
  maximumWithdrawal : string;

}
