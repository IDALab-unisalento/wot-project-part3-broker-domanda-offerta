import { ModalComponent } from './../modal/modal.component';
import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-error-vector',
  templateUrl: './modal-error-vector.component.html',
  styleUrls: ['./modal-error-vector.component.scss']
})
export class ModalErrorVectorComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalComponent>) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.dialogRef.close();
    setTimeout(()=>{window.location.reload()},500);
  }
}
