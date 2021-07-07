import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  me : User={} as User;

  allUsers : User[] = {} as User[];
  username : string = "";
  logout='';
  sidebar : boolean = false;

  constructor(
    public router : Router,
    private userService : UserService,
) { }

  ngOnInit(): void {
    this.getAllUsers();

    this.me = JSON.parse(String(localStorage.getItem("admin")));
    this.logout=JSON.parse(String(localStorage.getItem("logout")))

  }

  getAllUsers(){
    this.userService.getAll().subscribe(users =>{
      this.allUsers = users;
    });

  }


}
