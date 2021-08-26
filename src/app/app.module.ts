import { AffittuarioAnaliticsComponent } from './components/affittuario-analitics/affittuario-analitics.component';
import { PendingRegistrationComponent } from './components/pending-registrations/pending-registrations.component';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { UserService } from './services/user.service';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { CompanyHomeComponent } from './components/company-home/company-home.component';
import { AffittuarioHomeComponent } from './components/affittuario-home/affittuario-home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalComponent } from './components/modal/modal.component';
import { CompanyService } from './services/company.service';
import { AffittuarioService } from './services/affittuario.service';
import { AdminService } from './services/admin.service';
import { ModalBlankComponent } from './components/modal-blank/modal-blank.component';
import { ModalWaitComponent } from './components/modal-wait/modal-wait.component';
import { CompanyVectorService } from './services/company-vector.service';
import { VectorService } from './services/vector.service';
import { RouteService } from './services/route.service';
import { ViaggioRouteService } from './services/viaggio-route.service';
import { DatePipe } from '@angular/common';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { IgxGeographicMapModule } from 'igniteui-angular-maps';
import { IgxDataChartInteractivityModule } from 'igniteui-angular-charts';
import { ViaggioService } from './services/viaggio.service';
import { MyVectorsComponent } from './components/my-vectors/my-vectors.component';
import { ModalErrorVectorComponent } from './components/modal-error-vector/modal-error-vector.component';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SummaryModalComponent } from './components/summary-modal/summary-modal.component';
import { ModalErrorComponent } from './components/modal-error/modal-error.component';
import { ModalTimeErrorComponent } from './components/modal-time-error/modal-time-error.component';
import { BookingModalComponent } from './components/booking-modal/booking-modal.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ViaggioRouteProgressBarComponent } from './components/viaggio-route-progress-bar/viaggio-route-progress-bar.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { DashboardCompanyComponent } from './components/dashboard-company/dashboard-company.component';

import { HistoryComponent } from './components/history/history.component';
import { ModalConfirmComponent } from './components/modal-confirm/modal-confirm.component';
import { ChartsModule } from 'ng2-charts';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AboutComponent } from './components/about/about.component';
@NgModule({
  declarations: [

    AppComponent,
    HistoryComponent,
    ModalConfirmComponent,
    NavBarComponent,
    LoginComponent,
    HomeComponent,
    NavBarComponent,
    AdminHomeComponent,
    CompanyHomeComponent,
    AffittuarioHomeComponent,
    PendingRegistrationComponent,
    ModalComponent,
    ModalBlankComponent,
    ModalWaitComponent,
    ScheduleComponent,
    ModalConfirmComponent,
    MyVectorsComponent,
    ModalErrorVectorComponent,
    SearchFilterPipe,
    SignUpComponent,
    SummaryModalComponent,
    ModalErrorComponent,
    ModalTimeErrorComponent,
    BookingModalComponent,
    ViaggioRouteProgressBarComponent,
    NotFoundComponent,
    DashboardComponent,
    DashboardCompanyComponent,
    AffittuarioAnaliticsComponent,
    ViaggioRouteProgressBarComponent,
    AboutComponent
    ],

  imports: [
    MatIconModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    ChartsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    BrowserAnimationsModule,
    MatListModule,
    MatInputModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatButtonModule,
    IgxGeographicMapModule,
    IgxDataChartInteractivityModule,
    MatNativeDateModule,
    NgxMaterialTimepickerModule,
    NgxSpinnerModule,
    HighchartsChartModule,
    ChartsModule,
    FlexLayoutModule,
    MatCardModule,
    MatSlideToggleModule
      ],
  providers: [
            {
              provide: MatDialogRef,
              useValue: {}
            },
              UserService,
              CompanyService,
              AffittuarioService,
              AdminService,
              CompanyVectorService,
              VectorService,
              RouteService,
              ViaggioRouteService,
              DatePipe,
              ViaggioService

                          ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
