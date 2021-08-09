import { Component, OnInit } from '@angular/core';
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
import { ViaggioRoute } from '../../models/viaggio-route';
import { NgxSpinnerService } from 'ngx-spinner';
import { AffittuarioPrenotaViaggioRoute } from 'src/app/models/affittuario-prenota-viaggio-route';
import { AffituarioPrenotaRouteService } from 'src/app/services/affituario-prenota-route.service';
import { Affittuario } from '../../models/affittuario';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';
const _MS_PER_DAY = 1000 * 60 * 60 * 24;

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  allViaggioInfo: ViaggioInfo[]=[];
  loggedUser: Affittuario={} as Affittuario;

  constructor( private viaggioService: ViaggioService, private routeService: RouteService,
    private viaggioRouteService: ViaggioRouteService,private spinnerService : NgxSpinnerService,
     private companyService: CompanyService,private matDialog : MatDialog,
     private vectorService: VectorService, private affBookRoute: AffituarioPrenotaRouteService) {
     }

  ngOnInit(): void {
    this.loggedUser=JSON.parse(String(localStorage.getItem('loggedUser')));
    this.loadViaggioInfo();
    this.spinnerService.show();
    setTimeout(() => {
      /** spinner ends after 1500 milliseconds */
     this.spinnerService.hide()
     console.log(this.allViaggioInfo)
    }, 1200);

  }

  show=false;

 dateDiffInDays(dat:any) {
    // Discard the time and time-zone information.
    if(dat == null){return false;}
    const now=new Date();
    const maxWithDrawl=new Date(dat);
    if(now < maxWithDrawl)return true;
    else return false;

  }


  deleteBooking( item: ViaggioInfo){

    this.spinnerService.show();

    this.affBookRoute.deleteBooking(item.bookingId).toPromise().then(
      deleted=>{console.log(deleted);
        this.viaggioRouteService.updateCapacity(item.avaibleCapacityViaggio+item.bookedCapacity,item.idViaggio_Route).toPromise().then(
          fatto=>{
            console.log(fatto)
            this.spinnerService.hide();
            this.openModal("Your cancellation request has been realized");

          }
        )
    }
    )


  }

  openModal(modalText: string) {

    localStorage.setItem('ModalText', JSON.stringify(modalText));
     const dialogConfig = new MatDialogConfig();
     // The user can't close the dialog by clicking outside its body
     dialogConfig.disableClose = true;
     dialogConfig.height = "160px";
     dialogConfig.width = "550px";
     // https://material.angular.io/components/dialog/overview
     const modalDialog = this.matDialog.open(ModalConfirmComponent, dialogConfig);
   }

  loadViaggioInfo(){

    this.affBookRoute.getByAffittuario(this.loggedUser.id).toPromise().then(
      bookingList=>{
        // for each travels , get :
        // all routes, the company, the vector of that travel
        for (let i=0 ; i< bookingList.length;i++){
          let viaggioInfo: ViaggioInfo={} as ViaggioInfo;
          viaggioInfo.idViaggio_Route=bookingList[i].viaggioRouteId;
          viaggioInfo.bookedCapacity=bookingList[i].bookedCapacity;
          viaggioInfo.bookingId=bookingList[i].id;
          this.viaggioRouteService.getById(bookingList[i].viaggioRouteId).toPromise().then(
            viaggioRoutes=>{
              viaggioInfo.avaibleCapacityViaggio=viaggioRoutes.availableCapacity;
              viaggioInfo.maximum_WithDrawl=viaggioRoutes.maximumWithdrawal;
              viaggioInfo.startDateViaggio=viaggioRoutes.startDate;
              viaggioInfo.endDateViaggio=viaggioRoutes.endDate;
              this.routeService.getById(viaggioRoutes.routeId).toPromise().then(
                route=>{
                  viaggioInfo.routes=[];
                  viaggioInfo.routes.push(route);
                }
              )
              // get vector+company info info
              this.viaggioService.getById(viaggioRoutes.viaggioId).toPromise().then(
                viaggio=>{
                  viaggioInfo.costoKm=viaggio.costoPerKm;
                   this.vectorService.getById(viaggio.vectorId).toPromise().then(
                      vector=>{
                      viaggioInfo.vectorOwnerViaggio=vector;
                    }
                  )
                  this.companyService.getById(viaggio.companyId).toPromise().then(
                    company=>{
                      viaggioInfo.companyOwnerViaggio=company;
                    }
                  )
                }
              )
              this.allViaggioInfo.push(viaggioInfo)
            }
          )
       }
      }
    )
  }

}
