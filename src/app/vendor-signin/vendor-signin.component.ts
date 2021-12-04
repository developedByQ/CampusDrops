import { Component, OnInit } from '@angular/core';
import { NgModel } from "@angular/forms";
import firebase from "firebase";
import { Router } from "@angular/router";
import { delay } from 'utils-decorators';


@Component({
  selector: 'app-vendor-signin',
  templateUrl: './vendor-signin.component.html',
  styleUrls: ['./vendor-signin.component.css']
})
export class VendorSigninComponent implements OnInit {
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
        // @ts-ignore
        this.getUserRole(user.uid);
        localStorage.setItem('uid', user!.uid);
      })
      .catch((error) => {
        console.log("Error: " + error.message);
        alert(error.message);
      });
  }

  @delay(3000)
  getUserRole(uid: string) {
    var finalRole = "";
    firebase.database().ref().child("users").once('value', (SnapShot) => {
      var role = SnapShot.child(uid).child("role").val();
      console.log(role);
      localStorage.setItem('role', role);
      if (role == 0) {
        this.route.navigate(["/aggiehome"]).then(r => { });
      } else if (role == 1) {
        this.route.navigate(["/vendorhome"]).then(r => { });
      } else if (role == 2) {
        this.route.navigate(["/driverhome"]).then(r => { });
      } else {
        alert('Error, please try again.')
      }
    });


  }
}
