import { Component, OnInit } from '@angular/core';
import firebase from "firebase";
import {Router} from "@angular/router";
import {MainService} from "../main.service";

@Component({
  selector: 'app-vendor-home',
  templateUrl: './vendor-home.component.html',
  styleUrls: ['./vendor-home.component.css']
})
export class VendorHomeComponent implements OnInit {
  private route: Router;
  public currentVendor:any;
  public currentVenderproductList:any=[];
  constructor(route: Router,public service:MainService) {
    this.route = route;
    this.currentVendor="9sQTCoRI9zcIjboAvTVZO5NDdRs2";

  }

  ngOnInit(): void {
    debugger
   this.service.dataRec.subscribe(()=>{
     for(var item in this.service.ItemList){
       if(this.service.ItemList[item].vendor==this.currentVendor){
         this.currentVenderproductList.push(this.service.ItemList[item]);
       }
     }
   });


  }

  signUserOut() {
    firebase.auth().signOut().then(() => {
      console.log("logged out");
      this.route.navigate(['/vendorsignin']).then(r =>{});
    }).catch((error) => {
      // An error happened.
      console.log(error);
    });
  }

  goToAddItem() {
    this.route.navigate(['/vendoradditem']).then(r =>{});
  }
}
