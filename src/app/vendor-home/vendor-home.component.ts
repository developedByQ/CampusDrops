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
  Accept(key: any) {
    var obj = {
      status: 'Ready',
    };
    firebase
      .database()
      .ref()
      .child('order')
      .child(key)
      .update(obj)
      .then(() => {
        alert('Order is Ready');
      })
      .catch((error) => {});
  }

  goToAddItem() {
    this.route.navigate(['/vendoradditem']).then((r) => {});
  }

  goToViewAllItems() {
    this.route.navigate(['/viewitems']).then((r) => {});
  }

  goToSettings() {
    this.route.navigate(['/settings']).then((r) => {});
  }
}
