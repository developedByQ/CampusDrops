import { Component, OnInit } from '@angular/core';
import {NgModel} from "@angular/forms";
import firebase from "firebase";
import {Router} from "@angular/router";

@Component({
  selector: 'app-driver-signup',
  templateUrl: './driver-signup.component.html',
  styleUrls: ['./driver-signup.component.css']
})
export class DriverSignupComponent implements OnInit {

  profileImagePath: string;
  private route: Router;

  constructor(route: Router) {
    this.route = route;
    this.profileImagePath = 'assets/placeholder.png';
  }


  ngOnInit(): void {
  }

  onFileInput($event: Event) {
    // @ts-ignore
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      // @ts-ignore
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        // @ts-ignore
        this.profileImagePath = event.target.result;
      }
    }
  }

  signUserIn(email: NgModel, password: NgModel) {
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log("User Signed In: " + user?.uid)
        this.route.navigate(['/driverhome']).then(r =>{});
      })
      .catch((error) => {
        console.log("Error: " + error.message);
        alert(error.message);
      });
  }



  signUserUp(firstName: NgModel, lastName: NgModel, email: NgModel, password: NgModel, licensePlate: NgModel, carMake: NgModel, carModel: NgModel, carYear: NgModel) {
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
          license_plate: licensePlate.value,
          car_make: carMake.value,
          car_model: carModel.value,
          car_year: carYear.value,
          role: 2
        }
        ref.child('users').child(userID).update(user).then(()=>{
          this.route.navigate(['/driverhome']).then(r =>{});
        })

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(error.message);
      });
  }
}
