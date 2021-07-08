import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AffittuarioService } from 'src/app/services/affittuario.service';
import { CompanyService } from 'src/app/services/company.service';
import { UserService } from 'src/app/services/user.service';
import { ModalBlankComponent } from '../modal-blank/modal-blank.component';
import { ModalWaitComponent } from '../modal-wait/modal-wait.component';
import { ModalComponent } from '../modal/modal.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('loginForm')loginForm:any;
   userToLogin : User = {} as User;
   presentAlert : boolean = false;


  constructor(private affittuarioService : AffittuarioService, private companyService : CompanyService, private matDialog : MatDialog ,private userService : UserService, private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit():any{
    this.userService.login(this.loginForm.value.username, this.loginForm.value.password)
     .subscribe(data=>{

      if(data.type == 'admin'){

            localStorage.setItem('loggedUser', JSON.stringify(data));
            localStorage.setItem('logout',JSON.stringify("in"))
            localStorage.setItem('userType', JSON.stringify(data.type));

            this.router.navigateByUrl("/home")
      }

      if(data.type == 'affittuario'){
      this.affittuarioService.getById(data.id).subscribe(affittuario =>{
        if(!affittuario.disabilitated){
          localStorage.setItem('loggedUser', JSON.stringify(affittuario));
          localStorage.setItem('logout',JSON.stringify("in"))
          localStorage.setItem('userType', JSON.stringify(data.type));

          this.router.navigateByUrl("/home")

        }

        else
        this.openModalNotAbilitated()

      })
    }

    if(data.type == 'company'){
      this.companyService.getById(data.id).subscribe(company =>{
        if(!company.disabilitated){
          localStorage.setItem('loggedUser', JSON.stringify(company));
          localStorage.setItem('logout',JSON.stringify("in"))
          localStorage.setItem('userType', JSON.stringify(data.type));

          this.router.navigateByUrl("/home")

        }

        else
        this.openModalNotAbilitated()

      })
    }

    }, err =>{
      if(this.loginForm.value.username != null && this.loginForm.value.password != null  )
      this.openModal();
      else if(this.loginForm.value.username == null && this.loginForm.value.password == null )
      this.openModalBlank()
    });

  }


  openModal() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "200px";
    dialogConfig.width = "300px";
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
  }

  openModalBlank() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "150px";
    dialogConfig.width = "300px";
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(ModalBlankComponent, dialogConfig);
  }

  openModalNotAbilitated(){
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "250px";
    dialogConfig.width = "300px";
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(ModalWaitComponent, dialogConfig);
  }
}
