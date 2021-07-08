import { User } from './../../models/user';
import { UserService } from './../../services/user.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Affittuario } from './../../models/affittuario';
import { Company } from './../../models/company';
import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { AffittuarioService } from 'src/app/services/affittuario.service';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-pending-registrations',
  templateUrl: './pending-registrations.component.html',
  styleUrls: ['./pending-registrations.component.scss']
})
export class PendingRegistrationComponent implements OnInit {

  pendingCompanyList : Company[] = [];
  pendingAffittuariList : Affittuario[] = [];

  constructor(private adminService: AdminService,
     private http : HttpClient, private companyService : CompanyService,
    private  affittuarioService : AffittuarioService,
    private route : Router , private userService : UserService) { }

  pendingUser : User = {} as User;
  company : Company = {} as Company;
  affittuario : Affittuario = {} as Affittuario;

  ngOnInit(): void {
    this.companyService.getDisabled(true).subscribe(data =>{
        this.pendingCompanyList = data;
    })


    this.affittuarioService.getDisabled(true).subscribe(data =>{
      this.pendingAffittuariList = data;

    })

  }

  confirmRegistration(id : number, type : string){
    const result  = confirm('Are you sure you wanna confirm this user?') ;

    if(result == true){

       this.adminService.enableUserById(id).subscribe(data =>{
         console.log(data);

         if(type == "company"){
          this.company = this.pendingUser as Company;
          let pos = this.pendingCompanyList.indexOf((this.company));
          this.pendingCompanyList.splice(pos,1);
        }
        else
        if(type == "affittuario"){
          this.affittuario = this.pendingUser as Affittuario;
          let pos = this.pendingAffittuariList.indexOf((this.affittuario));
          this.pendingAffittuariList.splice(pos,1);

        }
      })

      window.location.reload();
    }

  }

  rejectRegistration(id : number, type : string){


    const result  = confirm('Are you sure you wanna reject this user?') ;

    if(result == true){
       this.userService.deleteById(id).subscribe(data =>{
         if(type == "company"){
          this.company = this.pendingUser as Company;
          let pos = this.pendingCompanyList.indexOf((this.company));
          this.pendingCompanyList.splice(pos,1);
        }
        else
        if(type == "affittuario"){
          this.affittuario = this.pendingUser as Affittuario;
          let pos = this.pendingAffittuariList.indexOf((this.affittuario));
          this.pendingAffittuariList.splice(pos,1);

        }
      })
   }


  }


}
