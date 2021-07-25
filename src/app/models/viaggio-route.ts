import { Route } from './route';
export interface ViaggioRoute {

  id : number;
  availableCapacity : number;
  startDate : Date;
  endDate : Date;
  routeId : number;
  viaggioId : number;
  route : Route;
  dayStart : number;
  dayEnd : number;
  startDateString : string;
  endDateString : string;
  distance : number;
  maximumWithdrawal : Date;



}
