import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';
import { Router } from '@angular/router';
import { MainService } from '../main.service';

@Component({
  selector: 'app-vendor-home',
  templateUrl: './vendor-home.component.html',
  styleUrls: ['./vendor-home.component.css'],
})
export class VendorHomeComponent implements OnInit {
  private route: Router;

  constructor(route: Router, public service: MainService) {
    this.route = route;
  }

  ngOnInit(): void {

  }

  signUserOut() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log('logged out');
        this.route.navigate(['/vendorsignin']).then((r) => {});
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  }

  goToAddItem() {
    this.route.navigate(['/vendoradditem']).then((r) => {});
  }

  goToViewAllItems() {
    this.route.navigate(['/viewitems']).then((r) => {});
  }
}
