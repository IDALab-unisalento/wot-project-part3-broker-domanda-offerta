import { MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from './../modal/modal.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-time-error',
  templateUrl: './modal-time-error.component.html',
  styleUrls: ['./modal-time-error.component.scss']
})
export class ModalTimeErrorComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalComponent>) { }

  ngOnInit(): void {
  }


  closeModal() {
    this.dialogRef.close();
  }
}
