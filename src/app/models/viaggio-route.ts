import { Route } from './route';
export interface ViaggioRoute {

  id : number;
  availableCapacity : number;
  startDate : Date;
  endDate : Date;
  vectorId : number;
  routeId : number;
  route : Route;
  day : number;
  startDateString : string;
  endDateString : string;

}
