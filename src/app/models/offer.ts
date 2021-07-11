import { Route } from './route';
export interface Offer {

  vectorId : number;
  viaggioId : number;
  vectorType : string;
  vectorBrand : string;
  licensePlate : string;
  available ?: boolean;
  occupiedCapacity : number;
  startingCity ?: string;
  endingCity ?: string;
  startingDate ?: Date;
  endingDate : Date;
  routes : Route[];
  length : number; // i Km
  lastDay : boolean //mi serve per segnarlo di giallo
}
