import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('loginForm')loginForm:any;
   userToLogin : User = {} as User;
   presentAlert : boolean = false;


  constructor(private userService : UserService, private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit():any{
    this.userService.login(this.loginForm.value.username, this.loginForm.value.password)
     .subscribe(data=>{
      if(data ==null ) this.router.navigateByUrl("/errors")

        localStorage.setItem('loggedUser', JSON.stringify(data));
        localStorage.setItem('logout',JSON.stringify("in"))
        localStorage.setItem('userType', JSON.stringify(data.type));

        //this.presentAlert = true;
        this.router.navigateByUrl("/home")

      //this.router.navigateByUrl("/admin") //vai alla mia home

    });

  }



}
