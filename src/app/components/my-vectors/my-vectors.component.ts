import { CompanyVector } from './../../models/company-vector';
import { CompanyVectorService } from './../../services/company-vector.service';
import { VectorService } from './../../services/vector.service';
import { Vector } from './../../models/vector';
import { User } from './../../models/user';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalErrorVectorComponent } from '../modal-error-vector/modal-error-vector.component';
import { Form } from '@angular/forms';

@Component({
  selector: 'app-my-vectors',
  templateUrl: './my-vectors.component.html',
  styleUrls: ['./my-vectors.component.scss']
})
export class MyVectorsComponent implements OnInit {


  constructor(
    private matDialog : MatDialog,
    private companyVectorService : CompanyVectorService,
    private vectorService : VectorService) { }

  me : User = {} as User;
  type : string = "";
  companyVectors : CompanyVector[] = [] as CompanyVector[];
  myVectorsList : Vector[] = [] as Vector[];
  addMenu : boolean = false;
  x : boolean = true;
  x2 : boolean = false;
  allVectorsName : string[] = [] as string[];
  allBrands : string[] = [] as string[];

  //form
 newVector : Vector = {} as Vector;
  //end form
  showToast : boolean = false;


  ngOnInit(): void {
    this.newVector.biomedicalProducts = false;
    this.newVector.frozenProduct = false;
    this.me = JSON.parse(String(localStorage.getItem("loggedUser")));
    this.type = JSON.parse(String(localStorage.getItem("userType")));
    this.getMyVectors();
    this.getAllVectors();
  }

  getAllVectors(){
    this.vectorService.getAll().subscribe(allVectors => {
      allVectors.forEach(vector => {
        this.allVectorsName.push(vector.name);
        this.allBrands.push(vector.brand);

      });
            //elimino i doppioni
            this.allVectorsName = this.allVectorsName.filter(function(elem, index, self) {
              return index === self.indexOf(elem);
                        });
            //elimino i doppioni
                this.allBrands = this.allBrands.filter(function(elem, index, self) {
                  return index === self.indexOf(elem);
                });
    })
  }


  getMyVectors(){

    this.companyVectorService.getByCompanyId(this.me.id).subscribe(list =>{
      this.companyVectors = list;
      this.companyVectors.forEach(relation => {

        this.vectorService.getById(relation.vectorId).subscribe(vector => {
          this.myVectorsList.push(vector);

          //ordinamento
          this.myVectorsList.sort((v1,v2) => {
            if (v1.capacity < v2.capacity) {
                return 1;
            }

            if (v1.capacity > v2.capacity) {
                return -1;
            }

            return 0;
          });
        })

      });


    })

  }

addNewVector(){

  this.vectorService.getByTarga(this.newVector.licensePlate).subscribe(vector =>{
  //se esiste già mando un segnale di errore
    console.log(vector);
    //se non è trovato nessun vettore con quella targa,allora posso aggiungerlo tranquillamente
    this.companyVectorService.save(this.me.id, vector.id).subscribe(data => {console.log(data)});
    this.openModal();
  },error =>{

    this.vectorService.save(this.newVector).subscribe(vector => {

      this.companyVectorService.save(this.me.id, vector.id).subscribe(data => {console.log(data)});
      this.myVectorsList.push(this.newVector)
    })
  });
  this.x2 = true;
  this.showToast = true;
    }

    openModal() {
      const dialogConfig = new MatDialogConfig();
      // The user can't close the dialog by clicking outside its body
      dialogConfig.disableClose = true;
      dialogConfig.id = "modal-component";
      dialogConfig.height = "300px";
      dialogConfig.width = "400px";
      // https://material.angular.io/components/dialog/overview
      const modalDialog = this.matDialog.open(ModalErrorVectorComponent, dialogConfig);
    }

    onSubmit(vectorForm : Form){

    }

}
