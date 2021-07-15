import { Router } from '@angular/router';
import { Affittuario } from './../../models/affittuario';
import { Company } from './../../models/company';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from './../modal/modal.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-summary-modal',
  templateUrl: './summary-modal.component.html',
  styleUrls: ['./summary-modal.component.scss']
})
export class SummaryModalComponent implements OnInit {

  constructor( private router: Router, public dialogRef: MatDialogRef<ModalComponent>) { }

company : Company = {} as Company;
affittuario : Affittuario = {} as Affittuario;
type : string = "";

  ngOnInit(): void {

    this.type = JSON.parse(String(localStorage.getItem("type")));

    if(this.type == 'company')
      this.company = JSON.parse(String(localStorage.getItem("signUpped")));
    if(this.type == 'affittuario')
      this.affittuario = JSON.parse(String(localStorage.getItem("signUpped")));
  }

  closeModal() {
    this.dialogRef.close();
    this.router.navigateByUrl('/login');
  }
}
