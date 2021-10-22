import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AggieSignupComponent} from "./aggie-signup/aggie-signup.component";
import {DriverSignupComponent} from "./driver-signup/driver-signup.component";
import {VendorSignupComponent} from "./vendor-signup/vendor-signup.component";
import {VendorSigninComponent} from "./vendor-signin/vendor-signin.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {VendorHomeComponent} from "./vendor-home/vendor-home.component";
import {AggieHomeComponent} from "./aggie-home/aggie-home.component";
import {DriverHomeComponent} from "./driver-home/driver-home.component";
import {VendorAddItemComponent} from "./vendor-add-item/vendor-add-item.component";
import {AggieViewDetailsComponent} from "./aggie-view-details/aggie-view-details.component";

const routes: Routes = [
  { path: '',
    component: AggieSignupComponent
  },
  { path: 'aggiesignup',
    component: AggieSignupComponent
  },
  { path: 'driversignup',
    component: DriverSignupComponent
  },
  { path: 'vendorsignup',
    component: VendorSignupComponent
  },
  { path: 'vendorsignin',
    component: VendorSigninComponent
  },
  { path: 'forgotpassword',
    component: ForgotPasswordComponent
  },
  { path: 'vendorhome',
    component: VendorHomeComponent
  },
  { path: 'aggiehome',
    component: AggieHomeComponent
  },
  { path: 'driverhome',
    component: DriverHomeComponent
  },
  { path: 'vendoradditem',
    component: VendorAddItemComponent
  },
  { path: 'aggieviewdetail',
    component: AggieViewDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
