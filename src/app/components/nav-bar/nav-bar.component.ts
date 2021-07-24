import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { MatSidenav } from '@angular/material/sidenav';

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


userType  : string = "";

@ViewChild('sidenav') sidenav !: MatSidenav;

  ngOnInit(): void {
    this.getAllUsers();

    this.me = JSON.parse(String(localStorage.getItem("loggedUser")));
    this.logout=JSON.parse(String(localStorage.getItem("logout")))
    this.userType = JSON.parse(String(localStorage.getItem("userType")));

  }

  getAllUsers(){
    this.userService.getAll().subscribe(users =>{
      this.allUsers = users;
    });

  }

  logOut(){
    localStorage.removeItem('loggedUser');
    localStorage.setItem('logout',JSON.stringify("out"))
    this.router.navigateByUrl("login")
  }

  goToPendingListPage(){
    this.router.navigateByUrl('admin/pendingRegistration');
  }

  isExpanded = true;
showSubmenu: boolean = false;
isShowing = false;
showSubSubMenu: boolean = false;

mouseenter() {
  if (!this.isExpanded) {
    this.isShowing = true;
  }
}

mouseleave() {
  if (!this.isExpanded) {
    this.isShowing = false;
  }
}

}
