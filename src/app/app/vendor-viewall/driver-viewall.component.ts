import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {MainService} from "../main.service";


@Component({
  selector: 'app-driver-viewall',
  templateUrl: './driver-viewall.component.html',
  styleUrls: ['./driver-viewall.component.css']
})
export class DriverViewallComponent implements OnInit {

  private route: Router;
  public currentVendor: string | undefined = '';
  public currentVenderproductList: any = [];
  itemDetail: any;
  vendorName = '';
  role: string | null;
  isVendor = false;
  constructor(route: Router, public service: MainService) {
    this.route = route;
    this.role = localStorage.getItem('role');

    if(this.role=='1') {
      this.isVendor = true;
    } else {
      this.isVendor = false;
    }
  }

  ngOnInit(): void {
   
    this.currentVenderproductList = [];
    this.service.getAllItem();
    // @ts-ignore
    // this.currentVendor = firebase.auth().currentUser.uid;
    // console.log(this.currentVendor);
    this.service.dataRec.subscribe(() => {
      for (var item in this.service.ItemList) {
        if (this.service.ItemList[item].vendor == "WbCXGlmEUgR4T4OAGsojTxbpz662") {
          console.log(this.service.ItemList[item]);
          this.vendorName = this.service.ItemList[item].vendorName;
          this.currentVenderproductList.push(this.service.ItemList[item]);
        } else {
          console.log(this.service.ItemList[item].vendor);
        }
      }
    });

     if (this.service.globelId) {
      var index = this.service.itemList.findIndex(
        (ob: { itemID: any }) => ob.itemID == this.service.globelId
      );
      if (index >= 0) {
        this.itemDetail = this.service.itemList[index];
      }
    } 
  }

  deleteItem(item: any) {
    console.log(item);
    this.service.removeItem(item.itemID).then(() => console.log('deleted'), () => console.log('error rejected'))
    this.currentVenderproductList = [];
    this.service.getAllItem();
  }

}
