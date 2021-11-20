import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';
import { Router } from '@angular/router';
import { MainService } from './../main.service';

@Component({
  selector: 'app-driver-home',
  templateUrl: './driver-home.component.html',
  styleUrls: ['./driver-home.component.css'],
})
export class DriverHomeComponent implements OnInit {
  private route: Router;

  constructor(route: Router, public service: MainService) {
    this.route = route;
  }

  ngOnInit(): void {}

  signUserOut() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log('logged out');
        this.route.navigate(['/driversignin']).then((r) => {});
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  }
  Accept(key: any) {
    var obj = {
      status: 'Assigned',
    };
    firebase
      .database()
      .ref()
      .child('order')
      .child(key)
      .update(obj)
      .then(() => {
        alert('Order Assigned Successfully');
      })
      .catch((error) => {});
  }
}
