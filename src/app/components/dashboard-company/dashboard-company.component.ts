import { VectorService } from 'src/app/services/vector.service';
import { ViaggioRouteService } from 'src/app/services/viaggio-route.service';
import { ViaggioService } from 'src/app/services/viaggio.service';
import { Company } from './../../models/company';
import { User } from 'src/app/models/user';
import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { VectorRate } from 'src/app/models/vector-rate';
import { Vector } from 'src/app/models/vector';

@Component({
  selector: 'app-dashboard-company',
  templateUrl: './dashboard-company.component.html',
  styleUrls: ['./dashboard-company.component.scss']
})
export class DashboardCompanyComponent implements OnInit {

  chartOptions : any = {};
  show : boolean = false;
  pieOptions : any = {};
  Highcharts : any = Highcharts;
  loggedUser : User = {} as User;
  vectorRate : VectorRate[] = [] as VectorRate[];
  myVectors : Vector[] = [] as Vector[];
  counters : number[] = [] as number[];
  totalVectorsOffer : number = 0;

  JanC : number = 0;
  FebC : number = 0;
  MarC : number = 0;
  AprC : number = 0;
  MayC : number = 0;
  JunC : number = 0;
  JulC : number = 0;
  AugC : number = 0;
  SepC : number = 0;
  OctC : number = 0;
  NovC : number = 0;
  DecC : number = 0;

  constructor( private viaggioService : ViaggioService,
               private viaggioRouteService : ViaggioRouteService,
               private vectorService  :VectorService) { }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(String(localStorage.getItem("loggedUser")));

    this.getOffertePubblicate();
  }

  show2(){
    this.show = !this.show;
  this.chartOptions = {
    chart: {
        type: 'column',
        options3d: {
            enabled: true,
            alpha: 15,
            beta: 15,
            viewDistance: 25,
            depth: 40
        }
    },

    title: {
        text:  this.loggedUser.name +'\'s offer added / month'
    },

    xAxis: {
        categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'],
        labels: {
            skew3d: true,
            style: {
                fontSize: '16px'
            }
        }
    },

    yAxis: {
        allowDecimals: false,
        min: 0,
        title: {
            text: 'Number of new offers added',
            skew3d: true
        }
    },

    tooltip: {
        headerFormat: '<b>{point.key}</b><br>',
        pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y} / {point.stackTotal}'
    },

    plotOptions: {
        column: {
            stacking: 'normal',
            depth: 40
        }
    },

    series: [{
        name: 'Offers',
        data: [this.JanC, this.FebC, this.MarC, this.AprC, this.MayC, this.JunC, this.JulC, this.AugC, this.SepC, this.OctC, this.NovC, this.DecC],
        stack: 'female',
        color: 'rgb(128, 169, 245)'
    }
  ]
}
this.pieOptions= {
  chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
  },
  title: {
      text: 'Most rented vector types'
  },
  tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  },
  accessibility: {
      point: {
          valueSuffix: '%'
      }
  },
  plotOptions: {
      pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %',
              connectorColor: 'silver'
          }
      }
  },
  series: [{
      name: 'Percentage',
      data:
          this.vectorRate

  }]
}
  }

  getMese( month : number){

    if(month == 0){
      this.JanC = this.JanC + 1;
    }
    if(month == 1){
      this.FebC = this.FebC + 1;
    }
    if(month == 2){
      this.MarC = this.MarC + 1;
    }
    if(month == 3){
      this.AprC = this.AprC + 1;
    }
    if(month == 4){
      this.MayC = this.MayC + 1;
    }
    if(month == 5){
      this.JunC = this.JunC + 1;
    }
    if(month == 6){
      this.JulC = this.JulC + 1;
    }
    if(month == 7){
      this.AugC = this.AugC + 1;
    }
    if(month == 8){
      this.SepC = this.SepC + 1;
    }
    if(month == 9){
      this.OctC = this.OctC + 1;
    }
    if(month == 10){
      this.NovC = this.NovC + 1;
    }
    if(month == 11){
      this.DecC = this.DecC + 1;
    }

  }

  async getOffertePubblicate(){

    await new Promise<void> ((resolve, reject) => {

    this.viaggioService.getByCompanyId(this.loggedUser.id).subscribe(async viaggi =>{

      await new Promise<void> (async (resolve, reject) => {
      for (const viaggio of viaggi) {

        await new Promise<void> ((resolve, reject) => {
        this.viaggioRouteService.getByViaggioId(viaggio.id).subscribe(viaggioRouteList=>{

          var date : Date = new Date(viaggioRouteList[0].startDate);
          var month : number = date.getMonth();
          this.getMese(month);

          resolve();
        });
      });

      await new Promise<void> ((resolve, reject) => {
        this.vectorService.getById(viaggio.vectorId).subscribe(vector=>{

          var toAdd : boolean = true;
          for(var i = 0; i<this.myVectors.length; i++)
          {
            if(this.myVectors[i].licensePlate == vector.licensePlate){
              toAdd = false;
              this.counters[i] = this.counters[i] + 1;
              this.totalVectorsOffer = this.totalVectorsOffer + 1;
            }
          }
          if(toAdd){
            this.myVectors.push(vector);
            this.counters.push(1);
            this.totalVectorsOffer = this.totalVectorsOffer + 1;

          }
          resolve();
        });
      });

      }

      for(var i = 0; i<this.myVectors.length; i++){

        this.counters[i] = Number(((this.counters[i]/this.totalVectorsOffer)*100).toFixed(1));
        var v : VectorRate = {} as VectorRate;
        v.name = this.myVectors[i].name;
        v.y = this.counters[i];
        this.vectorRate.push(v);

      }

      resolve();

    });
    });
    resolve()
  });
  }

}
