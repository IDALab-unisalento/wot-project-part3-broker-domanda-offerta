import { AffittuarioAnaliticsComponent } from './components/affittuario-analitics/affittuario-analitics.component';
import { PendingRegistrationComponent } from './components/pending-registrations/pending-registrations.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ModalComponent } from './components/modal/modal.component';
import { MyVectorsComponent } from './components/my-vectors/my-vectors.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SummaryModalComponent } from './components/summary-modal/summary-modal.component';
import { AffittuarioHomeComponent } from './components/affittuario-home/affittuario-home.component';
import { ViaggioRouteProgressBarComponent } from './components/viaggio-route-progress-bar/viaggio-route-progress-bar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardCompanyComponent } from './components/dashboard-company/dashboard-company.component';
import { HistoryComponent } from './components/history/history.component';
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [
  {path: '',component:AboutComponent},
  //{path: 'errors', component:NotFound404Component},
  {path :'login', component:LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'admin/pendingRegistration', component : PendingRegistrationComponent},
  {path: 'modal', component : ModalComponent},
  {path: 'myVectors/:id', component : MyVectorsComponent},
  {path :'signup', component: SignUpComponent},
  {path: 'summary', component: SummaryModalComponent},
  {path: 'viaggioRoute/:id', component: ViaggioRouteProgressBarComponent},
  {path:'affittuarioHome', component: AffittuarioHomeComponent},
  {path: 'notFound', component: NotFoundComponent},
  {path: 'admin/dashboard', component: DashboardComponent},
  {path: 'company/dashboard/:id', component: DashboardCompanyComponent},
  {path:'about', component: AboutComponent},
  {path:'affittuarioHome', component: AffittuarioHomeComponent},
  {path: 'history', component: HistoryComponent},
  {path:'analytics', component: AffittuarioAnaliticsComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
