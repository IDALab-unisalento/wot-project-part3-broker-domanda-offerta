import { AffittuarioPrenotaViaggioRoute } from 'src/app/models/affittuario-prenota-viaggio-route';
import { RouteService } from 'src/app/services/route.service';
import { ViaggioService } from 'src/app/services/viaggio.service';
import { ViaggioRouteService } from './../../services/viaggio-route.service';
import { AffituarioPrenotaRouteService } from './../../services/affituario-prenota-route.service';
import { ViaggioRoute } from './../../models/viaggio-route';
import { Affittuario } from 'src/app/models/affittuario';
import { Company } from './../../models/company';
import { User } from 'src/app/models/user';
import { CompanyService } from 'src/app/services/company.service';
import { AffittuarioService } from 'src/app/services/affittuario.service';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { NgxSpinnerService } from 'ngx-spinner';
import { Fatturato } from 'src/app/models/fatturato';
import { PercentualeFatturato } from 'src/app/models/percentuale-fatturato';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  chartOptions : any = {};
  allUsers : User[] = [] as User[];
  allAffittuari : Affittuario [] = [] as Affittuario[];
  allCompanies : Company[] = [] as Company[];
  show : boolean = false;



  chartOptions2 : any = {};
  Highcharts2 : any = Highcharts;

  chartOptions3 : any = {};
  Highcharts3 : any = Highcharts;


  pieOptions : any = {};
  pie : any = Highcharts;


  JanBook : number = 0;
  FebBook : number = 0;
  MarBook : number = 0;
  AprBook : number = 0;
  MayBook : number = 0;
  JunBook : number = 0;
  JulBook : number = 0;
  AugBook : number = 0;
  SepBook : number = 0;
  OctBook : number = 0;
  NovBook : number = 0;
  DecBook : number = 0;


  unoBook : number = 0;
  dueBook : number = 0;
  treBook : number = 0;
  quattBook : number = 0;
  cinBook : number = 0;
  seiBook : number = 0;
  setBook : number = 0;
  ottBook : number = 0;
  novBook : number = 0;
  dieciBook : number = 0;
  undiciBook : number = 0;
  dodiciBook : number = 0;
  tredBook : number = 0;
  quattordBook : number = 0;
  quindiBook : number = 0;
  sediBook : number = 0;
  diciasBook : number = 0;
  dicioBook : number = 0;
  diciaBook : number = 0;
  ventiBook : number = 0;
  ventunoBook : number = 0;
  ventidueBook : number = 0;
  ventitreBook : number = 0;
  ventiquaBook : number = 0;
  venticinBook : number = 0;
  ventiseiBook : number = 0;
  ventisettBook : number = 0;
  ventottBook : number = 0;
  ventinovBook : number = 0;
  trentaBook : number = 0;
  trentunoBook : number = 0;


  bookings : AffittuarioPrenotaViaggioRoute[] = [] as AffittuarioPrenotaViaggioRoute[];

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

  JanA : number = 0;
  FebA : number = 0;
  MarA : number = 0;
  AprA : number = 0;
  MayA : number = 0;
  JunA : number = 0;
  JulA : number = 0;
  AugA : number = 0;
  SepA : number = 0;
  OctA : number = 0;
  NovA : number = 0;
  DecA : number = 0;

  actualMonth : string = "";
  prezzi : number [] = [];

  fatturati : Fatturato[] = [] as Fatturato[];
  percentuali : PercentualeFatturato[] = [] as PercentualeFatturato[];

  incassiTotali : number = 0;

  Highcharts : any = Highcharts;
  constructor(private spinnerService : NgxSpinnerService,
              private userService : UserService,
              private affittuarioService : AffittuarioService,
              private companyService : CompanyService,
              private bookingService: AffituarioPrenotaRouteService,
              private viaggioRouteService : ViaggioRouteService,
              private viaggioService : ViaggioService,
              private routeService : RouteService
            ) { }

   ngOnInit(): void {
    this.actualMonth = 'Jul';


    this.getUsers();
    this.getBookings();
    this.getIncassiPerGiorno();
    this.getFatturato();

    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
    }, 500);

}

  async getUsers(){
  await new Promise<void> ((resolve, reject) => {

    this.userService.getAll().subscribe(async users =>{
      this.allUsers = users;

      await new Promise<void> (async (resolve, reject) => {

      for (const user of users) {

        if(user.type == 'company'){
          await new Promise<void> ((resolve, reject) => {

          this.companyService.getById(user.id).subscribe(company =>{
            this.allCompanies.push(company);

            if(company.abilitationDate != null){
              this.getMese(company);
            }
            resolve();

          });
        });
        }
        if(user.type == 'affittuario'){
          await new Promise<void> ((resolve, reject) => {

          this.affittuarioService.getById(user.id).subscribe(affittuario =>{
            this.allAffittuari.push(affittuario);

            if(affittuario.abilitationDate != null){
              this.getMeseAffittuario(affittuario);
            }
            resolve();
          });
        });
        }

          resolve();
      }

    });

      resolve();
    });
  });

}

getMese( company : Company){

  var date = new Date(company.abilitationDate);
  var month = date.getMonth();

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

getMeseAffittuario( affittuario : Affittuario){

  var date = new Date(affittuario.abilitationDate);
  var month = date.getMonth();

  if(month == 0){
    this.JanA = this.JanA + 1;
  }
  if(month == 1){
    this.FebA = this.FebA + 1;
  }
  if(month == 2){
    this.MarA = this.MarA + 1;
  }
  if(month == 3){
    this.AprA = this.AprA + 1;
  }
  if(month == 4){
    this.MayA = this.MayA + 1;
  }
  if(month == 5){
    this.JunA = this.JunA + 1;
  }
  if(month == 6){
    this.JulA = this.JulA + 1;
  }
  if(month == 7){
    this.AugA = this.AugA + 1;
  }
  if(month == 8){
    this.SepA = this.SepA + 1;
  }
  if(month == 9){
    this.OctA = this.OctA + 1;
  }
  if(month == 10){
    this.NovA = this.NovA + 1;
  }
  if(month == 11){
    this.DecA = this.DecA + 1;
  }

}

getMeseViaggioRoute( viaggioRoute : ViaggioRoute){

  var date = new Date(viaggioRoute.startDate);
  var month = date.getMonth();

  if(month == 0){
    this.JanBook = this.JanBook + 1;
  }
  if(month == 1){
    this.FebBook = this.FebBook + 1;
  }
  if(month == 2){
    this.MarBook = this.MarBook + 1;
  }
  if(month == 3){
    this.AprBook = this.AprBook + 1;
  }
  if(month == 4){
    this.MayBook = this.MayBook + 1;
  }
  if(month == 5){
    this.JunBook = this.JunBook + 1;
  }
  if(month == 6){
    this.JulBook = this.JulBook + 1;
  }
  if(month == 7){
    this.AugBook = this.AugBook + 1;
  }
  if(month == 8){
    this.SepBook = this.SepBook + 1;
  }
  if(month == 9){
    this.OctBook = this.OctBook + 1;
  }
  if(month == 10){
    this.NovBook = this.NovBook + 1;
  }
  if(month == 11){
    this.DecBook = this.DecBook + 1;
  }

}

getDayBooking( booking : AffittuarioPrenotaViaggioRoute, prezzo : number){

  var date = new Date(booking.prenotationDate);
  var day = date.getDate();

  if(day == 1){
    this.unoBook = this.unoBook + prezzo;
  }
  if(day == 2){
    this.dueBook = this.dueBook + prezzo;
  }
  if(day == 3){
    this.treBook = this.treBook + prezzo;
  }
  if(day == 4){
    this.quattBook = this.quattBook + prezzo;
  }
  if(day == 5){
    this.cinBook = this.cinBook + prezzo;
  }
  if(day == 6){
    this.seiBook = this.seiBook + prezzo;
  }
  if(day == 7){
    this.setBook = this.setBook + prezzo;
  }
  if(day == 8){
    this.ottBook = this.ottBook + prezzo;
  }
  if(day == 9){
    this.novBook = this.novBook + prezzo;
  }
  if(day == 10){
    this.dieciBook = this.dieciBook + prezzo;
  }
  if(day == 11){
    this.undiciBook = this.undiciBook + prezzo;
  }
  if(day == 12){
    this.dodiciBook = this.dodiciBook + prezzo;
  }

  if(day == 13){
    this.tredBook = this.tredBook + prezzo;
  }
  if(day == 14){
    this.quattordBook = this.quattordBook + prezzo;
  }
  if(day == 15){
    this.quindiBook = this.quindiBook + prezzo;
  }
  if(day == 16){
    this.sediBook = this.sediBook + prezzo;
  }
  if(day == 17){
    this.diciasBook = this.diciasBook + prezzo;
  }
  if(day == 18){
    this.dicioBook = this.dicioBook + prezzo;
  }
  if(day == 19){
    this.diciaBook = this.diciaBook + prezzo;
  }
  if(day == 20){
    this.ventiBook = this.ventiBook + prezzo;
  }
  if(day == 21){
    this.ventunoBook = this.ventunoBook + prezzo;
  }
  if(day == 22){
    this.ventidueBook = this.ventidueBook + prezzo;
  }
  if(day == 23){
    this.ventitreBook = this.ventitreBook + prezzo;
  }
  if(day == 24){
    this.ventiquaBook = this.ventiquaBook + prezzo;
  }

  if(day == 25){
    this.venticinBook = this.venticinBook + prezzo;
  }
  if(day == 26){
    this.ventiseiBook = this.ventiseiBook + prezzo;
  }
  if(day == 27){
    this.ventisettBook = this.ventisettBook + prezzo;
  }
  if(day == 28){
    this.ventottBook = this.ventottBook + prezzo;
  }
  if(day == 29){
    this.ventinovBook = this.ventinovBook + prezzo;
  }
  if(day == 30){
    this.trentaBook = this.trentaBook + prezzo;
  }
  if(day == 31){
    this.trentunoBook = this.trentunoBook + prezzo;
  }


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
        text: 'New registered users / month'
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
            text: 'Number of new users',
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
        name: 'Companies',
        data: [this.JanC, this.FebC, this.MarC, this.AprC, this.MayC, this.JunC, this.JulC, this.AugC, this.SepC, this.OctC, this.NovC, this.DecC],
        stack: 'female',
        color: 'rgb(128, 169, 245)'
    }, {
        name: 'Renters',
        data: [this.JanA, this.FebA, this.MarA, this.AprA, this.MayA, this.JunA, this.JulA, this.AugA, this.SepA, this.OctA, this.NovA, this.DecA],
        color: 'lightsalmon',
        stack: 'female'
    },
  ]
}

this.chartOptions2 = {
  title: {
      text: 'Booking / month'
  },
  subtitle: {
      text: ''
  },
  xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },

  series: [{
      type: 'column',
      colorByPoint: true,
      data: [this.JanBook, this.FebBook, this.MarBook, this.AprBook, this.MayBook, this.JunBook, this.JulBook, this.AugBook, this.SepBook, this.OctBook, this.NovBook, this.DecBook],
      showInLegend: false
  }]
}

this.chartOptions3 = {
  chart: {
      type: 'area'
  },
  title: {
      text: '$ spent by day'
  },
  subtitle: {
      text: 'month: July'
  },
  xAxis: {
      categories: [this.actualMonth+', 1', this.actualMonth+', 2', this.actualMonth+', 3',this.actualMonth+', 4', this.actualMonth+', 5', this.actualMonth+', 6', this.actualMonth+', 7', this.actualMonth+', 8', this.actualMonth+', 9', this.actualMonth+', 10', this.actualMonth+', 11', this.actualMonth+', 12', this.actualMonth+', 13', this.actualMonth+', 14', this.actualMonth+', 15', this.actualMonth+', 16', this.actualMonth+', 17', this.actualMonth+', 18', this.actualMonth+', 19', this.actualMonth+', 20', this.actualMonth+', 21', this.actualMonth+', 22', this.actualMonth+', 23', this.actualMonth+', 24', this.actualMonth+', 25', this.actualMonth+', 26', this.actualMonth+', 27', this.actualMonth+', 28', this.actualMonth+', 29', this.actualMonth+', 30'],
      tickmarkPlacement: 'on',
      title: {
          enabled: false
      }
  },
  yAxis: {
      title: {
          text: 'Dollars $'
      },

  },
  tooltip: {
      split: true,
      valueSuffix: ' $'
  },
  plotOptions: {
      area: {
          stacking: 'normal',
          lineColor: '#666666',
          lineWidth: 1,
          marker: {
              lineWidth: 1,
              lineColor: '#666666'
          }
      }
  },
  series: [{
      name: 'Asia',
      data: [502, 635, 809, 947, 1402, 3634, 5268,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  }, {
      name: 'Africa',
      data: [this.unoBook, this.dueBook, this.treBook, this.quattBook, this.cinBook,this.seiBook, this.setBook,this.ottBook, this.novBook,this.dieciBook,this.undiciBook,this.dodiciBook,this.tredBook,this.quattordBook,this.quindiBook,this.sediBook,this.diciasBook,this.dicioBook,this.diciaBook, this.ventiBook, this.ventunoBook, this.ventidueBook, this.ventitreBook, this.ventiquaBook,this.venticinBook, this.ventiseiBook,this.ventisettBook,this.ventottBook, this.ventinovBook,this.trentaBook,this.trentunoBook]
  }, {
      name: 'Europe',
      data: [163, 203, 276, 408, 547, 729, 628]
  }, {
      name: 'America',
      data: [18, 31, 54, 156, 339, 818, 1201]
  }, {
      name: 'Oceania',
      data: [2, 2, 2, 6, 13, 30, 46]
  }]
}
this.pieOptions = {
  chart: {
      type: 'pie',
      options3d: {
          enabled: true,
          alpha: 45,
          beta: 0
      }
  },
  title: {
      text: 'Major beneficiary companies'
  },
  accessibility: {
      point: {
          valueSuffix: '%'
      }
  },
  tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  },
  plotOptions: {
      pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          depth: 35,
          dataLabels: {
              enabled: true,
              format: '{point.name}'
          }
      }
  },
  series:
  [{
      type: 'pie',
      name: 'Percentage',
      data: [

          {
              name: this.percentuali[0].name,
              y: this.percentuali[0].percentuale,
              sliced: true,
              selected: true
          },
         // [this.percentuali[1].name, this.percentuali[1].percentuale],
         // [this.percentuali[2].name, this.percentuali[2].percentuale],
         //etcetera

      ]
  }]
}

}

async getBookings(){

  await new Promise<void> ((resolve, reject) => {
  this.bookingService.getAll().subscribe(async data =>{
    this.bookings = data;

    await new Promise<void> (async (resolve, reject) => {
      for (const booking of data) {
        await new Promise<void> ((resolve, reject) => {
        this.viaggioRouteService.getById(booking.viaggioRouteId).subscribe(async viaggioRoute =>{

          this.getMeseViaggioRoute(viaggioRoute);

          resolve();
        });
      });
        resolve();
      }
    });

    resolve();
  });
});
}

  async getIncassiPerGiorno(){
  await new Promise<void> ((resolve, reject) => {
    this.bookingService.getAll().subscribe(async data =>{
      this.bookings = data;

      await new Promise<void> (async (resolve, reject) => {
        for (const booking of data) {

          await new Promise<void> ((resolve, reject) => {
          this.viaggioRouteService.getById(booking.viaggioRouteId).subscribe(async viaggioRoute =>{

            var costo : number;
            var distance : number;

            await new Promise<void> ((resolve, reject) => {

            this.viaggioService.getById(viaggioRoute.viaggioId).subscribe(viaggio=>{
                costo = viaggio.costoPerKm;

                resolve();
            });
          });

          await new Promise<void> ((resolve, reject) => {

            this.routeService.getById(viaggioRoute.routeId).subscribe(route=>{
                distance = route.distanceKm;
                var prezzo : number = distance * costo;
                this.getDayBooking(booking, Number(prezzo.toFixed(1)));

                resolve();
            });
          });

            resolve();
          });
        });
          resolve();
        }
      });

      resolve();
    });
  });
}

async getFatturato(){
  await new Promise<void> ((resolve, reject) => {
    this.bookingService.getAll().subscribe(async data =>{
      this.bookings = data;

      await new Promise<void> (async (resolve, reject) => {
        for (const booking of data) {

          await new Promise<void> ((resolve, reject) => {
          this.viaggioRouteService.getById(booking.viaggioRouteId).subscribe(async viaggioRoute =>{

            var costo : number;
            var distance : number;
            var prezzo : number;
            var companyName : string;

            await new Promise<void> ((resolve, reject) => {

            this.viaggioService.getById(viaggioRoute.viaggioId).subscribe(async viaggio=>{
                costo = viaggio.costoPerKm;
                await new Promise<void> ((resolve, reject) => {

                this.companyService.getById(viaggio.companyId).subscribe(company=>{
                  companyName = company.name
                  resolve();
                })
              })


                resolve();
            });
          });

          await new Promise<void> ((resolve, reject) => {

            this.routeService.getById(viaggioRoute.routeId).subscribe(route=>{
                distance = route.distanceKm;
                 prezzo = distance * costo;
                var fatturato : Fatturato = {} as Fatturato;
                fatturato.companyName = companyName;
                fatturato.fatturato = Number(prezzo.toFixed(1));
                var yetPresent : boolean = false;
                for(var i = 0; i<this.fatturati.length;i++){
                  if(this.fatturati[i].companyName == fatturato.companyName){
                  yetPresent = true;
                  this.fatturati[i].fatturato = this.fatturati[i].fatturato + fatturato.fatturato;
                }
                }
                if(!yetPresent)
                  this.fatturati.push(fatturato);
                  resolve();
            });
          });
            resolve();
          });

        });
          resolve();
        }

        for(var i = 0; i< this.fatturati.length;i ++){

          this.incassiTotali = this.incassiTotali + this.fatturati[i].fatturato;
        }


        for(var i = 0; i< this.fatturati.length;i ++){

          var percFatt : PercentualeFatturato  = {} as PercentualeFatturato;

          percFatt.name = this.fatturati[i].companyName;
          percFatt.percentuale = Number(((this.fatturati[i].fatturato / this.incassiTotali) * 100).toFixed(1));

          this.percentuali.push(percFatt);

        }

        console.log(this.percentuali)
      });

      resolve();
    });
  });
}
}
