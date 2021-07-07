import { User } from "./user";

export interface Company extends User{

  webSite : string;
  phoneNumber : string;
  headquarters : string;
  jobSector : string;
  legalForm : string;
  iva : string;
  disabilitated : boolean;
  abilitationDate : Date;
}
