import { ViaggioService } from './../../services/viaggio.service';
import { VectorService } from './../../services/vector.service';
import { Route } from './../../models/route';
import { ViaggioRoute } from '../../models/viaggio-route';
import { MatDialogRef } from '@angular/material/dialog';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ViaggioRouteService } from 'src/app/services/viaggio-route.service';
import { RouteService } from 'src/app/services/route.service';
import { DatePipe } from '@angular/common';
import { IgxGeographicMapComponent } from 'igniteui-angular-maps';
import { Vector } from 'src/app/models/vector';
import { Viaggio } from 'src/app/models/viaggio';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],

})


export class ScheduleComponent implements OnInit,AfterViewInit {

  viaggioId : number = 0;
  viaggioRouteList : ViaggioRoute[] = [] as ViaggioRoute[];
  days : number[] = [];
  dates : Date[] = [];
  now : string = "";
  now2 : Date = {} as Date;
  nowFormatted : string = "";
  vector : Vector = {} as Vector;
  viaggio : Viaggio = {} as Viaggio;
  occupiedCapacity : number[] = [] as number[];

  @ViewChild("map")
public map : IgxGeographicMapComponent  = {} as IgxGeographicMapComponent;

  constructor(public dialogRef: MatDialogRef<ScheduleComponent>,
              private viaggioRouteService : ViaggioRouteService,
              private datepipe: DatePipe,
              private routeService : RouteService,
              private vectorService : VectorService,
              private viaggioService : ViaggioService) { }

  ngOnInit(): void {

     this.now2 = new Date();
    this.nowFormatted =String(this.datepipe.transform(this.now2, 'yyyy-MM-dd hh:mm a'));

    this.viaggioId = JSON.parse(String(localStorage.getItem("viaggio")));
    this.getRoutesOfAVector();
    this.getDays();

  }

  getRoutesOfAVector(){
    this.viaggioService.getById(this.viaggioId).subscribe(viaggio=>{
      this.viaggio = viaggio;
        //mi serve per acquisire la capacità del veicolo
        this.vectorService.getById(viaggio.vectorId).subscribe(vector =>{
          this.vector = vector;
        })
    });



    this.viaggioRouteService.getByViaggioId(this.viaggioId).subscribe(lista=>{
      this.viaggioRouteList = lista;

      for (const viaggioRoute of this.viaggioRouteList) {

        viaggioRoute.route = {} as Route;
        viaggioRoute.startDateString =String(this.datepipe.transform(viaggioRoute.startDate, 'yyyy-MM-dd hh:mm',"GMT" ));
        viaggioRoute.endDateString  =String(this.datepipe.transform(viaggioRoute.endDate, 'yyyy-MM-dd hh:mm',"GMT"));
        viaggioRoute.day =  (Number(String(viaggioRoute.startDate).substring(8,10)));
        //problema del pm /am nelle 2 stringhe che non si risolve, non riconosce le ore del PM per il confronto di > (le tratta come se fossero semplici AM)

        this.routeService.getById(viaggioRoute.routeId).subscribe( route =>{
          viaggioRoute.route = route;
        });
      }

    })
  }

  getDays(){

    this.viaggioService.getById(this.viaggioId).subscribe(viaggio=>{

      //mi serve per acquisire la capacità del veicolo
        this.vectorService.getById(viaggio.vectorId).subscribe(vector =>{

    this.viaggioRouteService.getByViaggioId(this.viaggioId).subscribe(lista=>{

      for (const viaggioRoute of lista) {

        this.days.push(Number(String(viaggioRoute.startDate).substring(8,10)));
        this.dates.push(viaggioRoute.startDate);
        var somma : number = ((vector.capacity - viaggioRoute.availableCapacity) / vector.capacity )*100;
        this.occupiedCapacity.push(Number(somma.toFixed(1)));
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


  })
});
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
