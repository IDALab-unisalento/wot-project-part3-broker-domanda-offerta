import { Component, OnInit } from '@angular/core';
import { Viaggio } from 'src/app/models/viaggio';
import { RouteService } from 'src/app/services/route.service';
import { ViaggioService } from 'src/app/services/viaggio.service';
import { Vector } from '../../models/vector';
import { User } from '../../models/user';
import { Route } from 'src/app/models/route';
import { VectorService } from 'src/app/services/vector.service';
import { UserService } from 'src/app/services/user.service';
import { CompanyVectorService } from 'src/app/services/company-vector.service';
import { ViaggioInfo } from 'src/app/models/viaggio-info';
import { ViaggioRouteService } from 'src/app/services/viaggio-route.service';
import { Company } from '../../models/company';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-affittuario-home',
  templateUrl: './affittuario-home.component.html',
  styleUrls: ['./affittuario-home.component.scss']
})
export class AffittuarioHomeComponent implements OnInit {

  allViaggioInfo: ViaggioInfo[]=[];

  constructor(
      private viaggioService: ViaggioService,
     private routeService: RouteService,
     private viaggioRouteService: ViaggioRouteService,
     private companyService: CompanyService,
     private vectorService: VectorService
     ) {


  }

   ngOnInit(): void {
     this.viaggioService.getAll().toPromise().then(
      travels=>{
        // for each travels , get :
        // all routes, the company, the vector of that travel
        for (let i=0 ; i< travels.length;i++){
          let viaggioInfo: ViaggioInfo={} as ViaggioInfo;
          this.viaggioRouteService.getByViaggioId(travels[i].id).toPromise().then(
            viaggioRoutesArray=>{
              let d1=new Date(viaggioRoutesArray[viaggioRoutesArray.length-1].endDate);
              let d2=new Date();
              //end date vene prima ( < ) oppure dopo ( > ) di adesso
              if( d1 > d2){
                viaggioInfo.costoKm=travels[i].costoPerKm;
                if(viaggioRoutesArray.length!=1 ){
              viaggioInfo.startDateViaggio=viaggioRoutesArray[0].startDate;
              viaggioInfo.endDateViaggio=viaggioRoutesArray[viaggioRoutesArray.length-1].endDate;
              }
              if(viaggioRoutesArray.length==1 ){
                viaggioInfo.startDateViaggio=viaggioRoutesArray[0].startDate;
              viaggioInfo.endDateViaggio=viaggioRoutesArray[0].endDate;
              }
              this.routeService.findAllRoutes(travels[i].id).toPromise().then(
                routes=>{

                  viaggioInfo.routes=routes;

                }
              )

              this.viaggioRouteService.getByViaggioId(travels[i].id).toPromise().then(
                viaggioRoute=>{
                  viaggioInfo.viaggioRouteInfo=viaggioRoute;
                }
              )

              this.vectorService.getById(travels[i].vectorId).toPromise().then(
                vector=>{
                  viaggioInfo.vectorOwnerViaggio=vector;
                }
              )
              this.companyService.getById(travels[i].id).toPromise().then(
                company=>{
                  viaggioInfo.companyOwnerViaggio=company;
                }
              )
              this.allViaggioInfo.push(viaggioInfo)
              }

            }
          )

       }
      }
    )
    console.log(this.allViaggioInfo)
  }

  getAvaibleCapacity(travelInfo: ViaggioInfo,routeId: number) {
    setTimeout(()=>{},800)
    let avaible='Nan';
    for(let i=0; i<travelInfo.viaggioRouteInfo.length;i++){
      if(travelInfo.viaggioRouteInfo[i].routeId==routeId){
        avaible=String(travelInfo.viaggioRouteInfo[i].availableCapacity);
        break;
      }
    }
    return avaible;

  }



}
