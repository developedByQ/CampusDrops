import { Component, OnInit } from '@angular/core';
import {NgModel} from "@angular/forms";
import firebase from "firebase";
import {Router} from "@angular/router";

@Component({
  selector: 'app-vendor-signup',
  templateUrl: './vendor-signup.component.html',
  styleUrls: ['./vendor-signup.component.css']
})
export class VendorSignupComponent implements OnInit {

  profileImagePath: string;
  private route: Router;
  constructor(route: Router) {
    this.route = route
    this.profileImagePath = 'assets/placeholder.png'
  }

  ngOnInit(): void {
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

  signVendorUp(businessName: NgModel, businessAddress: NgModel, email: NgModel, password: NgModel) {
    // @ts-ignore
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
      .then((userCredential) => {
        var ref = firebase.database().ref();
        var userID: any = userCredential.user?.uid
        var user = {
          userID: userID,
          email: userCredential.user?.email,
          name: businessName.value,
          address: businessAddress.value,
        }
        ref.child('vendors').child(userID).update(user).then(()=>{
          this.route.navigate(['/vendorhome']).then(r =>{});
        })

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(error.message);
      });
  }
}
