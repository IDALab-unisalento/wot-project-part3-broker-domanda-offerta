import { Route } from './../../models/route';
import { ViaggioRoute } from '../../models/viaggio-route';
import { MatDialogRef } from '@angular/material/dialog';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ViaggioRouteService } from 'src/app/services/viaggio-route.service';
import { RouteService } from 'src/app/services/route.service';
import { DatePipe } from '@angular/common';
import { IgxGeographicMapComponent } from 'igniteui-angular-maps';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],

})


export class ScheduleComponent implements OnInit,AfterViewInit {

  vectorId : number = 0;
  vectorRouteList : ViaggioRoute[] = [] as ViaggioRoute[];
  days : number[] = [];
  dates : Date[] = [];
  now : string = "";
  now2 : Date = {} as Date;
  nowFormatted : string = "";


  @ViewChild("map")
public map : IgxGeographicMapComponent  = {} as IgxGeographicMapComponent;

  constructor(public dialogRef: MatDialogRef<ScheduleComponent>,
              private vectorRouteService : ViaggioRouteService,
              private datepipe: DatePipe,
              private routeService : RouteService) { }

  ngOnInit(): void {

     this.now2 = new Date();
    this.nowFormatted =String(this.datepipe.transform(this.now2, 'yyyy-MM-dd hh:mm a'));

    this.vectorId = JSON.parse(String(localStorage.getItem("vettore")));
    this.getRoutesOfAVector();
    this.getDays();

  }

  getRoutesOfAVector(){
    this.vectorRouteService.getByVectorId(this.vectorId).subscribe(lista=>{
      this.vectorRouteList = lista;

      for (const vectorRoute of this.vectorRouteList) {

        vectorRoute.route = {} as Route;
        vectorRoute.startDateString =String(this.datepipe.transform(vectorRoute.startDate, 'yyyy-MM-dd hh:mm',"GMT" ));
        vectorRoute.endDateString  =String(this.datepipe.transform(vectorRoute.endDate, 'yyyy-MM-dd hh:mm',"GMT"));
        vectorRoute.day =  (Number(String(vectorRoute.startDate).substring(8,10)));
        //problema del pm /am nelle 2 stringhe che non si risolve, non riconosce le ore del PM per il confronto di > (le tratta come se fossero semplici AM)

        this.routeService.getById(vectorRoute.id).subscribe( route =>{
            vectorRoute.route = route;
        });
      }

    })
  }

  getDays(){

    this.vectorRouteService.getByVectorId(this.vectorId).subscribe(lista=>{

      for (const vectorRoute of lista) {

        this.days.push(Number(String(vectorRoute.startDate).substring(8,10)));
        this.dates.push(vectorRoute.startDate);
      }

      //elimino i doppioni
      this.days = this.days.filter(function(elem, index, self) {
        return index === self.indexOf(elem);
    })
    this.dates = this.dates.filter(function(elem, index, self) {
      return index === self.indexOf(elem);
  })
  //************************** */

    })


  }

  // If the user clicks the cancel button a.k.a. the go back button, then\
  // just close the modal
  closeModal() {
    this.dialogRef.close();
  }

  public ngAfterViewInit(): void {
    this.map.windowRect = { left: 0.2, top: 0.1, width: 0.7, height: 0.7 };
}

}
