import { Route } from "./route";
import { Company } from './company';
import { User } from './user';
import { Vector } from "./vector";
import { ViaggioRoute } from './viaggio-route';

export interface ViaggioInfo {

  idViaggio_Route:number;
  costoKm:number, startDateViaggio:Date, endDateViaggio:Date,
  avaibleCapacityViaggio: number;
  routes:Route[];
  companyOwnerViaggio: Company;
  vectorOwnerViaggio: Vector;
  viaggioRouteInfo: ViaggioRoute[];
  bookedCapacity:number;
  bookingId:number;
  maximum_WithDrawl: Date;

}
