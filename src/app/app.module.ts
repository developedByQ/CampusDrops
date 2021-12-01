import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AggieSignupComponent } from './aggie-signup/aggie-signup.component';
import { DriverSignupComponent } from './driver-signup/driver-signup.component';
import { AppRoutingModule } from './app-routing.module';
import { VendorSignupComponent } from './vendor-signup/vendor-signup.component';
import { VendorSigninComponent } from './vendor-signin/vendor-signin.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VendorHomeComponent } from './vendor-home/vendor-home.component';
import { FormsModule } from '@angular/forms';
import { AggieHomeComponent } from './aggie-home/aggie-home.component';
import firebase from 'firebase';
import { DriverHomeComponent } from './driver-home/driver-home.component';
import { MatCardModule } from '@angular/material/card';
import { AggieViewDetailsComponent } from './aggie-view-details/aggie-view-details.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { DriverViewallComponent } from './vendor-viewall/driver-viewall.component';
import { SettingsComponent } from './settings/settings.component';

const firebaseConfig = {
  apiKey: 'AIzaSyBdmCevfTZw4qc_gJ515b8SreEJN3cBEo0',
  authDomain: 'campus-drops.firebaseapp.com',
  databaseURL: 'https://campus-drops-default-rtdb.firebaseio.com',
  projectId: 'campus-drops',
  storageBucket: 'campus-drops.appspot.com',
  messagingSenderId: '770069460430',
  appId: '1:770069460430:web:c866aa725c8db5c25e279f',
  measurementId: 'G-GB31F3LFHX',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

@NgModule({
  declarations: [
    AppComponent,
    AggieSignupComponent,
    DriverSignupComponent,
    VendorSignupComponent,
    VendorSigninComponent,
    ForgotPasswordComponent,
    VendorHomeComponent,
    AggieHomeComponent,
    DriverHomeComponent,
    AggieViewDetailsComponent,
    CheckOutComponent,
    DriverViewallComponent,
    SettingsComponent,

  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, MatCardModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
