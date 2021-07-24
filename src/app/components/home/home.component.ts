import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(    private spinnerService : NgxSpinnerService,
    ) { }

  me : User = {} as User;
  type : string = "";

  ngOnInit(): void {

    this.me = JSON.parse(String(localStorage.getItem("loggedUser")));
    this.type = JSON.parse(String(localStorage.getItem("userType")));

    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
    }, 500);
  }

}
