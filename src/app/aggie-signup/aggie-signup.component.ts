import { Component, OnInit } from '@angular/core';
import {NgModel} from "@angular/forms";

import firebase from 'firebase';
import {Router} from "@angular/router";


@Component({
  selector: 'aggie-signup',
  templateUrl: './aggie-signup.component.html',
  styleUrls: ['./aggie-signup.component.css']
})
export class AggieSignupComponent implements OnInit {

  profileImagePath: string;
  private route: Router;


  constructor(route: Router)
  {
    this.route = route;
    this.profileImagePath = 'assets/placeholder.png'
  }

  ngOnInit(): void {
    this.checkIfLoggedIn();
  }

  onFileInput($event: Event) {
    // @ts-ignore
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      // @ts-ignore
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        // @ts-ignore
        this.profileImagePath = event.target.result;
      }
    }
  }

  checkIfLoggedIn() {
    const user = firebase.auth().currentUser;
    if (user) {
      this.route.navigate(['/aggiehome']).then(r =>{});
    } else {
      console.log("checkIfLoggedIn: Not Signed In")
    }
  }

  getUserInfo(firstName: NgModel, lastName: NgModel, email: NgModel, password: NgModel) {
    console.log(firstName, lastName, email, password);

    // @ts-ignore
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
      .then((userCredential) => {
        var ref = firebase.database().ref();
        var userID: any = userCredential.user?.uid
        var user = {
          userID: userID,
          email: userCredential.user?.email,
          first_name: firstName.value,
          last_name: lastName.value,
        }
        ref.child('users').child(userID).update(user).then(()=>{
          this.route.navigate(['/aggiehome']).then(r =>{});
        })

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(error.message);
      });
  }

}
