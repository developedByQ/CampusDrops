import { Component, OnInit } from '@angular/core';
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
  myFileName: any = "";
  selectedFile: any;
  businessName: any;
  businessAddress: any;
  emails: any;
  passwords: any;

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

  // signVendorUp(businessName: NgModel, businessAddress: NgModel, email: NgModel, password: NgModel) {
  //   // @ts-ignore
  //   firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
  //     .then((userCredential) => {
  //       var ref = firebase.database().ref();
  //       var userID: any = userCredential.user?.uid
  //       var user = {
  //         userID: userID,
  //         email: userCredential.user?.email,
  //         name: businessName.value,
  //         address: businessAddress.value,
  //       }
  //       ref.child('vendors').child(userID).update(user).then(()=>{
  //         this.route.navigate(['/vendorhome']).then(r =>{});
  //       })
  //
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       alert(error.message);
  //     });
  // }

  getUserInfo() {
    let task = firebase.storage().ref("profileImages/" + this.myFileName);
    task.put(this.selectedFile).then(() => {
      // @ts-ignore
      task.getDownloadURL().then((url) => {
        console.log(url);
        this.updateProfile(url);
      })
    })
  }


  updateProfile(url: any) {
    // @ts-ignore

    firebase.auth().createUserWithEmailAndPassword(this.emails, this.passwords)
      .then((userCredential) => {

        var ref = firebase.database().ref();
        var userID: any = userCredential.user?.uid
        var user = {
          userID: userID,
          email: userCredential.user?.email,
          business_name: this.businessName,
          business_address: this.businessAddress,
          profile_image: url,
          role: 1

        }

        ref.child('users').child(userID).update(user).then(()=>{
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
