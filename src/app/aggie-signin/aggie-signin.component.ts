import { Component, OnInit } from '@angular/core';
import firebase from "firebase";
import {Router} from "@angular/router";
import {NgModel} from "@angular/forms";

@Component({
  selector: 'app-aggie-signin',
  templateUrl: './aggie-signin.component.html',
  styleUrls: ['./aggie-signin.component.css']
})
export class AggieSigninComponent implements OnInit {
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
