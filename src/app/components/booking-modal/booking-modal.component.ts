import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { ViaggioInfo } from '../../models/viaggio-info';
import { Route } from 'src/app/models/route';
import { AffittuarioPrenotaViaggioRoute } from 'src/app/models/affittuario-prenota-viaggio-route';
import { AffituarioPrenotaRouteService } from 'src/app/services/affituario-prenota-route.service';
import { Affittuario } from 'src/app/models/affittuario';
import { ViaggioRouteService } from 'src/app/services/viaggio-route.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-booking-modal',
  templateUrl: './booking-modal.component.html',
  styleUrls: ['./booking-modal.component.scss']
})




export class BookingModalComponent implements OnInit {

  @ViewChild('bookingForm')bookingForm:any;

  travelSelected: ViaggioInfo={} as ViaggioInfo
  routeSelected: Route={} as Route;
  requiredCapacity: number=-1;
  affittuario: Affittuario={} as Affittuario;


  constructor(public dialogRef: MatDialogRef<BookingModalComponent>,private router: Router,
    private bookingService: AffituarioPrenotaRouteService, private viaggioRouteService: ViaggioRouteService) { }

  ngOnInit(): void {
    this.affittuario=JSON.parse(String(localStorage.getItem('loggedUser')));
    this.travelSelected=JSON.parse(String(localStorage.getItem('viaggioSelected')));
    this.routeSelected=JSON.parse(String(localStorage.getItem('routeSelected')))
  }

  closeModal() {
    this.dialogRef.close();
  }

  book(){
    if(this.requiredCapacity > 0 ){
      for(let i=0; i<this.travelSelected.viaggioRouteInfo.length;i++){
        // seleziono la particolare tupla
        if(this.travelSelected.viaggioRouteInfo[i].routeId==this.routeSelected.id){
          //se hai trovato la rotta vedi se c'è possibilità e se la puoi prenotare
          if( this.travelSelected.viaggioRouteInfo[i].availableCapacity >= this.requiredCapacity){
            if (new Date(this.travelSelected.viaggioRouteInfo[i].startDate ) > new Date()){
              let toBook: AffittuarioPrenotaViaggioRoute={} as AffittuarioPrenotaViaggioRoute;
              toBook.affittuarioId=this.affittuario.id;
              toBook.viaggioRouteId=this.travelSelected.viaggioRouteInfo[i].id;
              toBook.bookedCapacity=this.requiredCapacity;
              this.bookingService.saveBooking(toBook).toPromise().then(saved=>{console.log(saved)})
              // aggiorniamo quantità
              this.viaggioRouteService.updateCapacity(this.travelSelected.viaggioRouteInfo[i].availableCapacity-this.requiredCapacity,
                this.travelSelected.viaggioRouteInfo[i].id).toPromise().then(ok=>{console.log(ok)})
                this.closeModal();

                window.location.reload();

                alert("Booking done !!")
              }
            else{
              this.closeModal();
              window.location.reload();
              alert("Unable to complete the booking, the selected route has already begun ! ")

            }
          }
          else{
           this.closeModal();
          window.location.reload();
          alert ("Unsufficied capacity for satisfied user's request");
        }
            // vedere se di quella tupla la rotta NON è ancora iniziata


        }
      }
    }
    else {alert("Insert a capacity to book")}
  }



}
