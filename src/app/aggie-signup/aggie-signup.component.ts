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
  myFileName: any = "";
  selectedFile: any;
  firstNames: any;
  lastNames: any;
  emails: any;
 passwords: any;
  constructor(route: Router)
  {
    this.route = route;
    this.profileImagePath = 'assets/placeholder.png';


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
      // @ts-ignore
      this.selectedFiles = event.target.files[0];
      // @ts-ignore
      this.myFileName = event.target.files[0].name;
      // @ts-ignore
      this.selectedFile = event.target.files[0];
      reader.onload = (event) => { // called once readAsDataURL is completed
        // @ts-ignore
        this.profileImagePath = event.target.result;
        // @ts-ignore
        console.log(event.target.result.toString())
        // @ts-ignore
        console.log(event.target.result.valueOf())
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

  getUserInfo() {
    let task = firebase.storage().ref("profileImages/" + this.myFileName);
    task.put(this.selectedFile).then(()=>{
      // @ts-ignore
      task.getDownloadURL().then((url)=>{
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
          first_name: this.firstNames,
          last_name: this.lastNames,
          profile_image: url,
          role: 0

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
