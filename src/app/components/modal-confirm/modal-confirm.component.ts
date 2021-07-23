import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.scss']
})
export class ModalConfirmComponent implements OnInit {


  modalText: string='';

  constructor(public dialogRef: MatDialogRef<ModalComponent>) { }

  ngOnInit(): void {
    this.modalText=JSON.parse(String(localStorage.getItem('ModalText')))
  }


  closeModal(){
      this.dialogRef.close();
      localStorage.removeItem('ModalText');
      window.location.reload();

  }
}
