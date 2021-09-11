import { Component, OnInit } from '@angular/core';
import firebase from "firebase";
import {Router} from "@angular/router";

@Component({
  selector: 'app-aggie-home',
  templateUrl: './aggie-home.component.html',
  styleUrls: ['./aggie-home.component.css']
})
export class AggieHomeComponent implements OnInit {
  private route: Router;

  constructor(route: Router) {
    this.route = route;
  }

  ngOnInit(): void {
  }


  signUserOut() {
    firebase.auth().signOut().then(() => {
      console.log("logged out");
      this.route.navigate(['/aggiesignin']).then(r =>{});
    }).catch((error) => {
      // An error happened.
      console.log(error);
    });
  }
}
