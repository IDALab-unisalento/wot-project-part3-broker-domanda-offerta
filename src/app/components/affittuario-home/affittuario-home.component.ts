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
import { ViaggioRoute } from '../../models/viaggio-route';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-affittuario-home',
  templateUrl: './affittuario-home.component.html',
  styleUrls: ['./affittuario-home.component.scss']
})
export class AffittuarioHomeComponent implements OnInit {

  allViaggioInfo: ViaggioInfo[]=[];
  query : string = "";
  filterViaggioInfo: Viaggio[]=[];
  ok=false;
  constructor( private viaggioService: ViaggioService, private routeService: RouteService,
    private viaggioRouteService: ViaggioRouteService,private spinnerService : NgxSpinnerService,
     private companyService: CompanyService,private matDialog : MatDialog,
     private vectorService: VectorService) {}

   ngOnInit(): void {
     var filter=JSON.parse(String(localStorage.getItem('filter')));
      this.spinnerService.show();

      this.filterViaggioInfoLoader(filter);
      setTimeout(()=>{this.loadViaggioInfo(filter);},1200)
      console.log(this.filterViaggioInfo)
      console.log("prima del cambio")
      console.log(this.allViaggioInfo)

       console.log(this.allViaggioInfo)

      setTimeout(() => {
        /** spinner ends after 1500 milliseconds */
        this.allViaggioInfo.sort((x:ViaggioInfo, y:ViaggioInfo) =>- +new Date(x.startDateViaggio)+
        +new Date(y.startDateViaggio));
       this.spinnerService.hide()

      }, 1500);


   }


   filterViaggioInfoLoader(filterCity: any){
     if(filterCity==null){return}
    var start: string=filterCity.start;
    var end: string=filterCity.end;
    var capacity: string=filterCity.kg;
    var productType:string=filterCity.productType

    /**<<< possiedo solo città di arrivo + capacità richiesta >>>>*/
    if(start =='Start City' &&  end!='End City' && capacity!='Capacity Kg' ){
      this.routeService.getByEndCity(end).toPromise().then(
        routes=>{
          routes.forEach(route => {
            this.viaggioRouteService.getByRouteId(route.id).toPromise().then(
              viaggioRoutes=>{
                viaggioRoutes.forEach(viaggioRoute => {

                  let d1=new Date(viaggioRoute.startDate);
                  let d2=new Date();
                  if(d1 > d2 ){
                    if(viaggioRoute.availableCapacity >= Number(capacity)){
                      //ok inserisci tutto in info viaggio
                      this.viaggioService.getById(viaggioRoute.viaggioId).toPromise().then(
                        travel=>{
                          // vedi se rispetta i paramentri el filtro
                          this.vectorService.getById(travel.vectorId).toPromise().then(
                            vector=>{
                              if(productType == 'Bio Medical'){
                                if(vector.biomedicalProducts){
                                  this.filterViaggioInfo.push(travel)
                                }
                              }
                              if(productType == 'Frozen'){
                                if(vector.frozenProduct){
                                  this.filterViaggioInfo.push(travel)
                                }
                              }
                              if(productType== 'Product type' || productType== 'All'){
                                this.filterViaggioInfo.push(travel);
                              }
                            }
                          )
                        }
                      )
                    }
                  }


                });


              }
            )
          });
        }
      )

    }
    /** <<<<< possiedo tutto della rotta >>>> */
    if(start !='Start City' &&  end!='End City' && capacity!='Capacity Kg'){
      this.routeService.getByCities(start,end).toPromise().then(
        route=>{
          this.viaggioRouteService.getByRouteId(route.id).toPromise().then(
            viaggioRoutes=>{

              viaggioRoutes.forEach(viaggioRoute => {
                let d1=new Date(viaggioRoute.startDate);
              let d2=new Date();
              if(d1 > d2 ){
                if(viaggioRoute.availableCapacity >= Number(capacity)){
                  //ok inserisci tutto in info viaggio
                  this.viaggioService.getById(viaggioRoute.viaggioId).toPromise().then(
                    travel=>{
                      this.vectorService.getById(travel.vectorId).toPromise().then(
                        vector=>{
                          if(productType == 'Bio Medical'){
                            if(vector.biomedicalProducts){
                              this.filterViaggioInfo.push(travel)
                            }
                          }
                          if(productType == 'Frozen'){
                            if(vector.frozenProduct){
                              this.filterViaggioInfo.push(travel)
                            }
                          }
                          if(productType== 'Product type' || productType== 'All'){
                            this.filterViaggioInfo.push(travel);
                          }
                        }
                      )
                    }
                  )
                }
              }
              });
        }
      )
    }
    )

    }
    /** <<< possiedo solo la città di arrivo  */
    if(start =='Start City' &&  end!='End City' && capacity=='Capacity Kg'){
      this.routeService.getByEndCity(end).toPromise().then(
        routes=>{
          routes.forEach(route => {
            this.viaggioRouteService.getByRouteId(route.id).toPromise().then(
              viaggioRoutes=>{

                viaggioRoutes.forEach(viaggioRoute => {
                  let d1=new Date(viaggioRoute.startDate);
                let d2=new Date();
                if(d1 > d2 ){

                    //ok inserisci tutto in info viaggio
                    this.viaggioService.getById(viaggioRoute.viaggioId).toPromise().then(
                      travel=>{
                        this.vectorService.getById(travel.vectorId).toPromise().then(
                          vector=>{
                            if(productType == 'Bio Medical'){
                              if(vector.biomedicalProducts){
                                this.filterViaggioInfo.push(travel)
                              }
                            }
                            if(productType == 'Frozen'){
                              if(vector.frozenProduct){
                                this.filterViaggioInfo.push(travel)
                              }
                            }
                            if(productType== 'Product type' || productType== 'All'){
                              this.filterViaggioInfo.push(travel);
                            }
                          }
                        )
                      }
                    )

                }
                });

              }
            )
          });
        }
      )
    }
    /** <<< possiedo solo start City ed end City  */
    if(start !='Start City' &&  end!='End City' && capacity=='Capacity Kg'){
      this.routeService.getByCities(start,end).toPromise().then(
        route=>{
          this.viaggioRouteService.getByRouteId(route.id).toPromise().then(
            viaggioRoutes=>{

              viaggioRoutes.forEach(viaggioRoute => {
                let d1=new Date(viaggioRoute.startDate);
              let d2=new Date();
              if(d1 > d2 ){

                  //ok inserisci tutto in info viaggio
                  this.viaggioService.getById(viaggioRoute.viaggioId).toPromise().then(
                    travel=>{
                      this.vectorService.getById(travel.vectorId).toPromise().then(
                        vector=>{
                          if(productType == 'Bio Medical'){
                            if(vector.biomedicalProducts){
                              this.filterViaggioInfo.push(travel)
                            }
                          }
                          if(productType == 'Frozen'){
                            if(vector.frozenProduct){
                              this.filterViaggioInfo.push(travel)
                            }
                          }
                          if(productType== 'Product type' || productType== 'All'){
                            this.filterViaggioInfo.push(travel);
                          }
                        }
                      )
                    }
                  )

              }
              });
        }
      )
    }
    )
    }
    /** <<solo product type>>> */
    if(start =='Start City' &&  end=='End City' && capacity=='Capacity Kg'){
      this.viaggioService.getAll().toPromise().then(
        travels=>{
          // for each travels , get :
          // all routes, the company, the vector of that travel
          for (let i=0 ; i< travels.length;i++){
            let viaggioInfo: ViaggioInfo={} as ViaggioInfo;
            //prima controllo la tipologia di produt type
            this.vectorService.getById(travels[i].vectorId).toPromise().then(
              vector=>{
                if(productType == 'Bio Medical'){
                  if(vector.biomedicalProducts){
                    this.viaggioRouteService.getByViaggioId(travels[i].id).toPromise().then(
                      viaggioRoutesArray=>{
                        let d1=new Date(viaggioRoutesArray[viaggioRoutesArray.length-1].endDate);
                        let d2=new Date();
                        //end date vene prima ( < ) oppure dopo ( > ) di adesso
                        if( d1 > d2){
                          this.filterViaggioInfo.push(travels[i])
                        }

                      }
                    )
                  }
                }
                if(productType == 'Frozen'){
                  if(vector.frozenProduct){
                    this.viaggioRouteService.getByViaggioId(travels[i].id).toPromise().then(
                      viaggioRoutesArray=>{
                        let d1=new Date(viaggioRoutesArray[viaggioRoutesArray.length-1].endDate);
                        let d2=new Date();
                        //end date vene prima ( < ) oppure dopo ( > ) di adesso
                        if( d1 > d2){
                          this.filterViaggioInfo.push(travels[i])
                        }

                      }
                    )
                  }
                }
                if(productType== 'Product type' || productType== 'All'){
                  this.viaggioRouteService.getByViaggioId(travels[i].id).toPromise().then(
                    viaggioRoutesArray=>{
                      let d1=new Date(viaggioRoutesArray[viaggioRoutesArray.length-1].endDate);
                      let d2=new Date();
                      //end date vene prima ( < ) oppure dopo ( > ) di adesso
                      if( d1 > d2){
                        this.filterViaggioInfo.push(travels[i])
                      }

                    }
                  )
                }
              }
            )






         }
        }
      )
    }
   }

  loadViaggioInfo(filter:any){
    if(filter!=null ){
      for (let i=0 ; i< this.filterViaggioInfo.length;i++){
        let viaggioInfo: ViaggioInfo={} as ViaggioInfo;
        this.viaggioRouteService.getByViaggioId(this.filterViaggioInfo[i].id).toPromise().then(
          viaggioRoutesArray=>{
            let d1=new Date(viaggioRoutesArray[viaggioRoutesArray.length-1].endDate);
            let d2=new Date();
            //end date vene prima ( < ) oppure dopo ( > ) di adesso
            if( d1 > d2){
              viaggioInfo.costoKm=this.filterViaggioInfo[i].costoPerKm;
              if(viaggioRoutesArray.length!=1 ){
            viaggioInfo.startDateViaggio=viaggioRoutesArray[0].startDate;
            viaggioInfo.endDateViaggio=viaggioRoutesArray[viaggioRoutesArray.length-1].endDate;
            }
            if(viaggioRoutesArray.length==1 ){
              viaggioInfo.startDateViaggio=viaggioRoutesArray[0].startDate;
            viaggioInfo.endDateViaggio=viaggioRoutesArray[0].endDate;
            }
            this.routeService.findAllRoutes(this.filterViaggioInfo[i].id).toPromise().then(
              routes=>{
                viaggioInfo.routes=routes
              }
            )

            this.viaggioRouteService.getByViaggioId(this.filterViaggioInfo[i].id).toPromise().then(
              viaggioRoute=>{
                viaggioInfo.viaggioRouteInfo=viaggioRoute;
              }
            )

            this.vectorService.getById(this.filterViaggioInfo[i].vectorId).toPromise().then(
              vector=>{
                viaggioInfo.vectorOwnerViaggio=vector;
              }
            )
            this.companyService.getById(this.filterViaggioInfo[i].companyId).toPromise().then(
              company=>{
                viaggioInfo.companyOwnerViaggio=company;
              }
            )
            this.allViaggioInfo.push(viaggioInfo)
            }
          }
        )

     }
     localStorage.removeItem('filter')
     this.allViaggioInfo.sort((x:ViaggioInfo, y:ViaggioInfo) =>- +new Date(x.startDateViaggio)+
        +new Date(y.startDateViaggio));
    }
    //quando il filtro non c'è mostrali tutti
    else {
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
         this.allViaggioInfo.sort((x:ViaggioInfo, y:ViaggioInfo) =>- +new Date(x.startDateViaggio)+
        +new Date(y.startDateViaggio));
        }

      )
    }


  }


  openModal(travelInfo : ViaggioInfo,route: Route) {

   localStorage.setItem('viaggioSelected', JSON.stringify(travelInfo));
   localStorage.setItem('routeSelected', JSON.stringify(route));
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.height = "560px";
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
