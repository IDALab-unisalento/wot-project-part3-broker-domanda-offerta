import { User } from "./user";

export interface Affittuario extends User{

  surname : string;
  nation : string;
  phoneNumber : string;
  bornDate : Date;
  disabilitated : boolean;
  abilitationDate : Date;

}
