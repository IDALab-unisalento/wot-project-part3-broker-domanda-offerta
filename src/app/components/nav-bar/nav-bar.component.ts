import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { MatSidenav } from '@angular/material/sidenav';
import { RouteService } from 'src/app/services/route.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  me : User={} as User;
  query: string=''
  allUsers : User[] = {} as User[];
  username : string = "";
  logout='';
  sidebar : boolean = false;
  show:boolean=false;

  constructor(
    public router : Router,private routeService: RouteService,
    private userService : UserService,
) { }


userType  : string = "";
cities: string[]=[];
requiredStartCity: string='Start City';
requiredEndCity: string='End City';
requiredCapacity: any='Capacity Kg';
requiredProductType:string='Product type'

productType: string[]=['Bio Medical', 'Frozen', 'All']


@ViewChild('sidenav') sidenav !: MatSidenav;

  ngOnInit(): void {
    this.getAllUsers();
    this.getAllCities();
    if(this.router.url.includes("/history")|| this.router.url.includes("/analytics")){this.show=true;}
    this.me = JSON.parse(String(localStorage.getItem("loggedUser")));
    this.logout=JSON.parse(String(localStorage.getItem("logout")))
    this.userType = JSON.parse(String(localStorage.getItem("userType")));

  }

  selectedProductType(type: string){
    this.requiredProductType=type;
  }

  saveFilter(){
    var jsonFilter={
      'start': this.requiredStartCity,
      'end': this.requiredEndCity,
      'kg': this.requiredCapacity,
      'productType': this.requiredProductType
    }
    localStorage.setItem('filter', JSON.stringify(jsonFilter))

   this.clear();
   window.location.reload();
  }

  reload(){
    window.location.reload();
  }

  getAllCities(){
    this.routeService.getAll().subscribe( routes => {
      routes.forEach(route => {

        this.cities.push(route.startCity);
        this.cities.push(route.endCity);
      });
      //elimino i doppioni
      this.cities = this.cities.filter(function(elem, index, self) {
        return index === self.indexOf(elem);
      });
    })
  }

  getItems(ev : any) {

    this.query = ev.target.value;

  }

  clear(){
    this.requiredStartCity='Start City'
    this.requiredEndCity='End City'

    this.requiredCapacity='Capacity Kg';
  }

  selectedStart(city: string){
    this.requiredStartCity=city;

  }
  selectedEnd(city: string){
    this.requiredEndCity=city;

  }

  getAllUsers(){
    this.userService.getAll().subscribe(users =>{
      this.allUsers = users;
    });

  }

  logOut(){
    localStorage.removeItem('admin');
    localStorage.setItem('logout',JSON.stringify("out"))
    localStorage.clear();
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
