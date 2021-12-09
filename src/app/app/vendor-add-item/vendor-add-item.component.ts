import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import firebase from "firebase";


@Component({
  selector: 'app-vendor-add-item',
  templateUrl: './vendor-add-item.component.html',
  styleUrls: ['./vendor-add-item.component.css']
})
export class VendorAddItemComponent implements OnInit {

  profileImagePath: string;
  private route: Router;
  myFileName: any = "";
  selectedFile: any;

  vendorName: any;
  vendorImage: any;

  itemName: any;
  category: any;
  description: any;
  price: any;
  quantity: any;

  constructor(route: Router)
  {
    this.route = route;
    this.profileImagePath = 'assets/placeholder.png';


  }
  ngOnInit(): void {
    this.getVendorInfo();
    console.log(Math.floor(Date.now()/1000));
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

  saveImageToStorage() {
    let task = firebase.storage().ref("itemImages/" + this.myFileName);
    task.put(this.selectedFile).then(()=>{
      // @ts-ignore
      task.getDownloadURL().then((url)=>{
        console.log(url);
        this.updateProfile(url);
      })
    })

  }

  updateProfile(url: any) {
    let userID = firebase.auth().currentUser!.uid
    let itemRef = firebase.database().ref();
    let key: any = itemRef.push().key;
    let currentTime = Math.floor(Date.now()/1000);
    itemRef.child('allItems').child(key).set({
      itemID: key,
      itemName: this.itemName,
      vendorName: this.vendorName,
      vendorImage: this.vendorImage,
      vendor: userID,
      category: this.category,
      price: this.price,
      description: this.description,
      quantity: this.quantity,
      itemImage: url,
      timestamp: currentTime

    }).then(r =>{
      this.route.navigate(['/vendorhome']).then(r =>{});
    }) ;

  }


  getVendorInfo() {
    let userID = firebase.auth().currentUser!.uid
    console.log(userID);
    const dbRef = firebase.database().ref();
    dbRef.child("users/").child(userID).child("name").once('value').then(name=>{
      console.log(name.val());
      this.vendorName = name.val();
    });

    dbRef.child("users/").child(userID).child("profile_image").once('value').then(image=>{
      console.log(image.val());
      this.vendorImage = image.val();
    });
    }


}
