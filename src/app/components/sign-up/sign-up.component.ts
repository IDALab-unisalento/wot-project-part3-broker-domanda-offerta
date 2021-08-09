import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { AffittuarioService } from 'src/app/services/affittuario.service';
import { CompanyService } from 'src/app/services/company.service';
import { UserService } from 'src/app/services/user.service';
import { Affittuario } from './../../models/affittuario';
import { Company } from './../../models/company';
import { Component, OnInit } from '@angular/core';
import { SummaryModalComponent } from '../summary-modal/summary-modal.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  companyVersion : boolean = true;
  userVersion : boolean = false;
  newCompany : Company = {} as Company;
  newAffittuario : Affittuario = {} as Affittuario;
  allUsernames : string[] = [] as string[];
  allEmails : string[] = [] as string[];

  constructor(
    private userService : UserService,
    private matDialog : MatDialog,
    private companyService : CompanyService,
    private affittuarioService : AffittuarioService
  ) { }

  ngOnInit(): void {
    this.getAllUsernames();
  }

  companyMode(){
    this.companyVersion = true;
    this.userVersion = false;
  }
  userMode(){
    this.companyVersion = false;
    this.userVersion = true;
  }

  match() : boolean{
    if(this.companyVersion){
      if(this.newCompany.password == this.newCompany.confirmPassword){
        return true;
      }
      else return false;}

      if(this.userVersion){
        if(this.newAffittuario.password == this.newAffittuario.confirmPassword){
          return true;
        }
        else return false;}
    return false;
  }

  getAllUsernames(){
    this.userService.getAll().subscribe(users =>{
      users.forEach(user => {
        this.allUsernames.push(user.username);
        this.allEmails.push(user.email);

      });
    })
  }

  checkUsername() : boolean {
    if(this.companyVersion){
      for(var i = 0; i< this.allUsernames.length; i++){
        if(this.allUsernames[i] == this.newCompany.username)
          return true;
      }
      return false;}

      if(this.userVersion){
        for(var i = 0; i< this.allUsernames.length; i++){
          if(this.allUsernames[i] == this.newAffittuario.username)
            return true;
        }
        return false;}

        return false;
  }

  checkEmail() : boolean {

  if(this.companyVersion){
    for(var i = 0; i< this.allEmails.length; i++){
      if(this.allEmails[i] == this.newCompany.email)
        return true;
    }
    return false;}

    if(this.userVersion){
      for(var i = 0; i< this.allEmails.length; i++){
        if(this.allEmails[i] == this.newAffittuario.email)
          return true;
      }
      return false;}

      return false;
  }

register(){

  if(this.companyVersion){
    this.companyService.save(this.newCompany).subscribe(companySaved =>{
      localStorage.setItem('type', JSON.stringify('company'));
      localStorage.setItem('signUpped', JSON.stringify(companySaved));

      this.openModal();

    });}
  if(this.userVersion){
    this.affittuarioService.save(this.newAffittuario).subscribe(affittuarioSaved =>{
      localStorage.setItem('type', JSON.stringify('affittuario'));
      localStorage.setItem('signUpped', JSON.stringify(affittuarioSaved));
      this.openModal();
    });
  }
  }

  openModal(){
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "610px";
    dialogConfig.width = "600px";
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(SummaryModalComponent, dialogConfig);
  }
}
