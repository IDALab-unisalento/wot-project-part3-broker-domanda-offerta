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
import {Chart} from 'chart.js';


@Component({
  selector: 'app-affittuario-analitics',
  templateUrl: './affittuario-analitics.component.html',
  styleUrls: ['./affittuario-analitics.component.scss']
})
export class AffittuarioAnaliticsComponent implements OnInit {

  allViaggioInfo: ViaggioInfo[]=[];
  loggedUser: Affittuario={} as Affittuario;
  dataRouteChart: Route[]=[];
  result:any[]=[];
  numberChartRoute: number[]=[];

  dataVectorChart: Vector[]=[];
  numberChartVector:number[]=[];
  resultVector:any[]=[];

   doughnutChartLabelsRoute: string[]=[];
    doughnutChartDataRoute: number[] = []
   donutColorsRoute = [
    {
      backgroundColor: [
       ''
      ]
    }];



    doughnutChartLabelsVector: string[]=[];
    doughnutChartDataVector: number[] = []
   donutColorsVector = [
    {
      backgroundColor: [
       ''
      ]
    }];



  constructor(private viaggioService: ViaggioService, private routeService: RouteService,
    private viaggioRouteService: ViaggioRouteService,private spinnerService : NgxSpinnerService,
     private companyService: CompanyService,private matDialog : MatDialog,
     private vectorService: VectorService, private affBookRoute: AffituarioPrenotaRouteService) { }

  ngOnInit(): void {
    this.loggedUser=JSON.parse(String(localStorage.getItem('loggedUser')));
    this.loadViaggioInfo();
    setTimeout(()=>{this.buildDataForChart();},1200);
    this.spinnerService.show();
    setTimeout(() => {
      /** spinner ends after 1500 milliseconds */
     this.spinnerService.hide()
    }, 1200);
  }

  loadViaggioInfo(){

    this.affBookRoute.getByAffittuario(this.loggedUser.id).toPromise().then(
      bookingList=>{
        // for each travels , get :
        // all routes, the company, the vector of that travel
        for (let i=0 ; i< bookingList.length;i++){
          let viaggioInfo: ViaggioInfo={} as ViaggioInfo;
          viaggioInfo.bookedCapacity=bookingList[i].bookedCapacity;
          viaggioInfo.bookingId=bookingList[i].id;
          this.viaggioRouteService.getById(bookingList[i].viaggioRouteId).toPromise().then(
            viaggioRoutes=>{
              viaggioInfo.avaibleCapacityViaggio=viaggioRoutes.availableCapacity;
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

  buildDataForChart(){
    this.dataRouteChart=[];
    this.dataVectorChart=[];
    console.log(this.allViaggioInfo)
    for(let i=0; i<this.allViaggioInfo.length;i++){
        this.dataRouteChart.push(this.allViaggioInfo[i].routes[0])
    }
    this.result = [...this.dataRouteChart.reduce( (mp, o) => {
      if (!mp.has(o.id)) mp.set(o.id, { ...o, count: 0 });
      mp.get(o.id).count++;
      return mp;
  }, new Map).values()];

      console.log(this.result);
    for(let i=0; i< this.result.length;i++){
      this.doughnutChartLabelsRoute[i]=this.result[i].startCity+" "+this.result[i].endCity
      this.doughnutChartDataRoute[i]=this.result[i].count
      this.donutColorsRoute[0].backgroundColor[i]=this.getRandomColor();
    }
    //built for vector analitics
    for(let i=0; i<this.allViaggioInfo.length;i++){
      this.dataVectorChart.push(this.allViaggioInfo[i].vectorOwnerViaggio)
    }
    this.resultVector = [...this.dataVectorChart.reduce( (mp, o) => {
      if (!mp.has(o.id)) mp.set(o.id, { ...o, count: 0 });
      mp.get(o.id).count++;
      return mp;
  }, new Map).values()];
      console.log(this.resultVector);
      for(let i=0; i< this.resultVector.length;i++){
        this.doughnutChartLabelsVector[i]=this.resultVector[i].name;
        this.doughnutChartDataVector[i]=this.resultVector[i].count
        this.donutColorsVector[0].backgroundColor[i]=this.getRandomColor();
      }

  }


  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

}
