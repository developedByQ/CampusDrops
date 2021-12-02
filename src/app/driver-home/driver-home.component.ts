import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';
import { Router } from '@angular/router';
import { MainService } from './../main.service';
import { Product } from '../models/Product';
import { identity } from 'underscore';

@Component({
  selector: 'app-driver-home',
  templateUrl: './driver-home.component.html',
  styleUrls: ['./driver-home.component.css'],
})
export class DriverHomeComponent implements OnInit {
  private route: Router;
firstGroup:any=[]
secondGroup:any=[]
  constructor(route: Router, public service: MainService) {
    this.route = route;
  }

  ngOnInit(): void {
   // this.splitGroups();
  }
  splitGroups() {
    this.firstGroup = this.service.orderlist.filter(function (order:Product) {
      return order.status=="Assigned"||order.status=="Ready"||order.status=="Pending";
    });
    this.secondGroup = this.service.orderlist.filter(function (order:Product) {
      return order.status=="In Route"||order.status=="Complete";
    });

  }
ngAfterViewInit(){
  this.splitGroups();
}
split(orderList:any,key:string){
  if(key=='one'){
      var res=this.service.orderlist.filter(function (order:Product) {
        return order.status=="Assigned"||order.status=="Ready"||order.status=="Pending";
      });

      return res;
  }
  if(key=='two'){
    var res= this.service.orderlist.filter(function (order:Product) {
      return order.status=="In Route"||order.status=="Complete";
    });

    return res;
}

}
  signUserOut() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log('logged out');
        this.route.navigate(['/driversignin']).then((r) => {});
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  }
  Accept(key: any) {
    var obj = {
      status: 'In Route',
    };
    firebase
      .database()
      .ref()
      .child('order')
      .child(key)
      .update(obj)
      .then(() => {
        alert('Order is in Route');
      })
      .catch((error) => {});

  }
  InRoute(key: any) {
    var obj = {
      status: 'Complete',
    };
    firebase
      .database()
      .ref()
      .child('order')
      .child(key)
      .update(obj)
      .then(() => {
        alert('Order completed Successfully');
      })
      .catch((error) => {});
  }


  goToSettings() {
    this.route.navigate(['/settings']).then((r) => {});
  }
}
