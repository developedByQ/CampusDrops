import { Component, OnInit } from '@angular/core';
import firebase from "firebase";
import {Router} from "@angular/router";


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  private route: Router;
  profileImagePath: string;
  name: any;
  myFileName: any = "";
  selectedFile: any;

  constructor(route: Router) {
    this.profileImagePath = 'assets/placeholder.png';
    this.route = route;
  }

  ngOnInit(): void {
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
    let myUID = firebase.auth().currentUser?.uid
    firebase.database().ref('users/' + myUID).update({
      name: this.name,
      profile_image : url
    });
    this.route.navigate(['/aggiehome']).then(r =>{});

  }




  signUserOut() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log('logged out');
        localStorage.clear();
        this.route.navigate(['/vendorsignin']).then((r) => {});
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  }

}
