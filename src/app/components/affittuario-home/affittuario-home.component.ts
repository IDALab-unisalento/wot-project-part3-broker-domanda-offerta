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
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BookingModalComponent } from '../booking-modal/booking-modal.component';
import { ScheduleComponent } from '../schedule/schedule.component';

@Component({
  selector: 'app-affittuario-home',
  templateUrl: './affittuario-home.component.html',
  styleUrls: ['./affittuario-home.component.scss']
})
export class AffittuarioHomeComponent implements OnInit {

  allViaggioInfo: ViaggioInfo[]=[];
  ok=false;
  constructor( private viaggioService: ViaggioService, private routeService: RouteService,private viaggioRouteService: ViaggioRouteService,
     private companyService: CompanyService,private matDialog : MatDialog,
     private vectorService: VectorService) {}

   ngOnInit(): void {
    this.loadViaggioInfo();
    setTimeout(()=>{this.allViaggioInfo=[]; console.log("puloito")},7000)
  }

  loadViaggioInfo(){
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

                  viaggioInfo.routes=routes

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
              this.companyService.getById(travels[i].companyId).toPromise().then(
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


  openModal(travelInfo : ViaggioInfo,route: Route) {

   localStorage.setItem('viaggioSelected', JSON.stringify(travelInfo));
   localStorage.setItem('routeSelected', JSON.stringify(route));
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.height = "500px";
    dialogConfig.width = "600px";
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(BookingModalComponent, dialogConfig);
  }


  getAvaibleCapacity(travelInfo: ViaggioInfo,routeId: number) {
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
