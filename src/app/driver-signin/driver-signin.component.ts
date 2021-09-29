import { Component, OnInit } from '@angular/core';
import {NgModel} from "@angular/forms";
import firebase from "firebase";
import {Router} from "@angular/router";

@Component({
  selector: 'app-driver-signin',
  templateUrl: './driver-signin.component.html',
  styleUrls: ['./driver-signin.component.css']
})
export class DriverSigninComponent implements OnInit {
  private route: Router;

  constructor(route: Router) {
    this.route = route;
  }

  ngOnInit(): void {
  }

  signUserIn(email: NgModel, password: NgModel) {
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log("User Signed In: " + user?.uid)
        this.route.navigate(['/aggiehome']).then(r =>{});
      })
      .catch((error) => {
        console.log("Error: " + error.message);
        alert(error.message);
      });
  }
}
