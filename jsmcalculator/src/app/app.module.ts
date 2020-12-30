import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import { CustomFormsModule } from 'ng2-validation';
import {MatMenuModule} from '@angular/material/menu';
import {MatStepperModule} from '@angular/material/stepper';
 

import { Routes } from '@angular/router';

import { UsersComponent } from './users/users.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LoginComponent } from './login/login.component';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { UsersService } from './services/users.service'

import { MonumentService } from './services/monument.service';
import { MonumentComponent } from './monument-sector/monument/monument.component';
import { MonumentProfileComponent } from './monument-sector/monument-profile/monument-profile.component';

import { InstallationService } from './services/installation.service';
import { InstallationComponent } from './installation-sector/installation/installation.component';
import { InstallationProfileComponent } from './installation-sector/installation-profile/installation-profile.component';

import { InscriptionService } from './services/inscription.service';
import { InscriptionComponent } from './inscription-sector/inscription/inscription.component';
import { InscriptionProfileComponent } from './inscription-sector/inscription-profile/inscription-profile.component';

import { FoundationService } from './services/foundation.service';
import { FoundationComponent } from './foundation-sector/foundation/foundation.component';
import { FoundationProfileComponent } from './foundation-sector/foundation-profile/foundation-profile.component';

import { AccessoriesComponent } from './accessories-sector/accessories/accessories.component';
import { AccessoriesProfileComponent } from './accessories-sector/accessories-profile/accessories-profile.component'
import { AccessoriesService } from './services/accessories.service';
import { QuoteComponent, DialogOverviewExampleDialog } from './quote-sector/quote/quote.component';
import { QuoteProfileComponent } from './quote-sector/quote-profile/quote-profile.component';
import { QuoteDetailComponent } from './quote-sector//quote-detail/quote-detail.component';
import { IpGuard } from './services/ip-guard.service';
import { IpServiceService } from './services/ip-service.service';
import { IpAddressComponent } from './ip-sector/ip-address/ip-address.component';
import { IpProfileComponent } from './ip-sector/ip-profile/ip-profile.component';
import { IpRegisterComponent } from './ip-sector/ip-register/ip-register.component';
import { NopermissionComponent } from './notfound/nopermission/nopermission.component';
import { QuoteStepperComponent } from './quote-sector/quote-stepper/quote-stepper.component';
import { CastingComponent } from './casting-sector/casting/casting.component';
import { CastingProfileComponent } from './casting-sector/casting-profile/casting-profile.component';
import { InscriptionQuoteComponent, DialogOverviewExampleDialog1 } from './inscriptionQuoteSector/inscription-quote/inscription-quote.component';
import { InscriptionQuoteSteperComponent } from './inscriptionQuoteSector/inscription-quote-steper/inscription-quote-steper.component';
import { InscriptionQuoteDetailComponent } from './inscriptionQuoteSector/inscription-quote-detail/inscription-quote-detail.component';


const adminRoutes: Routes = [
  { path: 'userslist',  component:UsersComponent, canActivate:[IpGuard,AuthGuard]},
  { path: 'user-profile',   component: UserProfileComponent, canActivate:[IpGuard,AuthGuard] },
  { path: 'user-profile/:id',   component: UserProfileComponent, canActivate:[IpGuard,AuthGuard] },
  { path: 'resetpassword/:id',   component: UserProfileComponent, canActivate:[IpGuard,AuthGuard] },
  //monument management
  { path: 'monumentslist',   component: MonumentComponent, canActivate:[IpGuard,AuthGuard] },
  { path: 'monument-profile',   component: MonumentProfileComponent, canActivate:[IpGuard,AuthGuard] },
  { path: 'monument-profile/:id',   component: MonumentProfileComponent, canActivate:[IpGuard,AuthGuard] },
  //installation management
  { path: 'installationslist',   component: InstallationComponent, canActivate:[IpGuard,AuthGuard] },
  { path: 'installation-profile',   component: InstallationProfileComponent, canActivate:[IpGuard,AuthGuard] },
  { path: 'installation-profile/:id',   component: InstallationProfileComponent, canActivate:[IpGuard,AuthGuard] },
  //casting 
  { path: 'castingslist',   component: CastingComponent, canActivate:[IpGuard,AuthGuard] },
  { path: 'casting-profile',   component: CastingProfileComponent, canActivate:[IpGuard,AuthGuard] },
  { path: 'casting-profile/:id',   component: CastingProfileComponent, canActivate:[IpGuard,AuthGuard] },
  //inscription management
  { path: 'inscriptionslist',   component: InscriptionComponent, canActivate:[IpGuard,AuthGuard] },
  { path: 'inscription-profile',   component: InscriptionProfileComponent, canActivate:[IpGuard,AuthGuard] },
  { path: 'inscription-profile/:id',   component: InscriptionProfileComponent, canActivate:[IpGuard,AuthGuard] },
  //foundation management
  { path: 'foundationslist',   component: FoundationComponent, canActivate:[IpGuard,AuthGuard] },
  { path: 'foundation-profile',   component: FoundationProfileComponent, canActivate:[IpGuard,AuthGuard] },
  { path: 'foundation-profile/:id',   component: FoundationProfileComponent, canActivate:[IpGuard,AuthGuard] },
  //accessories
  { path: 'accessorieslist',   component: AccessoriesComponent, canActivate:[IpGuard,AuthGuard] },
  { path: 'accessories-profile',   component: AccessoriesProfileComponent, canActivate:[IpGuard,AuthGuard] },
  { path: 'accessories-profile/:id',   component: AccessoriesProfileComponent, canActivate:[IpGuard,AuthGuard] },
  //quote
  { path: 'quoteslist',   component: QuoteComponent, canActivate:[IpGuard,AuthGuard] },
  { path: 'calculator',   component: QuoteProfileComponent, canActivate:[IpGuard,AuthGuard] },
  { path: 'calculator2',   component: QuoteStepperComponent, canActivate:[IpGuard,AuthGuard] },
  { path: 'quotedetail/:id',   component: QuoteDetailComponent, canActivate:[IpGuard,AuthGuard] },
  { path: 'inscriptionQuoteslist',   component: InscriptionQuoteComponent, canActivate:[IpGuard,AuthGuard] },
  { path: 'inscriptioncalculator',   component: InscriptionQuoteSteperComponent, canActivate:[IpGuard,AuthGuard] },
  { path: 'InscriptionQuotesDetail/:id',   component: InscriptionQuoteDetailComponent, canActivate:[IpGuard,AuthGuard] },
  //ip
  { path: 'ipslist',   component: IpAddressComponent, canActivate:[IpGuard,AuthGuard] },
  { path: 'ip-profile',   component: IpProfileComponent, canActivate:[IpGuard,AuthGuard] },
  { path: 'ip-profile/:id',   component: IpProfileComponent, canActivate:[IpGuard,AuthGuard] },
  { path: 'register',   component: IpRegisterComponent},
  //notfound
  { path: 'nopermission', component: NopermissionComponent},
  //login
  { path: 'login', component:LoginComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserProfileComponent,
    LoginComponent,
    MonumentComponent,
    MonumentProfileComponent,
    InstallationComponent,
    InstallationProfileComponent,
    InscriptionComponent,
    InscriptionProfileComponent,
    FoundationComponent,
    FoundationProfileComponent,
    AccessoriesComponent,
    AccessoriesProfileComponent,
    QuoteComponent,
    DialogOverviewExampleDialog,
    DialogOverviewExampleDialog1,
    QuoteProfileComponent,
    QuoteDetailComponent,
    IpAddressComponent,
    IpProfileComponent,
    IpRegisterComponent,
    NopermissionComponent,
    QuoteStepperComponent,
    CastingComponent,
    CastingProfileComponent,
    InscriptionQuoteComponent,
    InscriptionQuoteSteperComponent,
    InscriptionQuoteDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(adminRoutes, { useHash: true }),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatMenuModule,
    MatStepperModule,
  ],
  providers: [
    UsersService, 
    AuthService,
    AuthGuard, 
    MonumentService, 
    InstallationService, 
    InscriptionService,
    FoundationService,
    AccessoriesService,
    IpGuard,
    IpServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
