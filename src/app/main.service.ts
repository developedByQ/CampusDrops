import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Subject } from 'rxjs';
import { CountList, Product } from './models/Product';
import * as _ from 'underscore';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  public ItemList: any = [];
  public itemList: any = [];
  public globelId: any;
  public checkoutList: any = [];
  public countList:CountList={
    total:0,
    inProgress:0,
    completed:0,
    onRoute:0
  }
  public orderlist: any = [];
  public dataRec: Subject<any> = new Subject();
  constructor() {
    let uid: any = firebase.auth().currentUser?.uid;
    this.getAllItem();
    this.getAllOrder();
  }
  getAllItem() {
    firebase
      .database()
      .ref()
      .child('allItems')
      .once('value', (SnapShot) => {
        var data = SnapShot.val();
        for (var item in data) {
          this.ItemList.push(data[item]);
          this.dataRec.next('data');
          console.log(this.ItemList);
        }
      });
  }
  getAllOrder() {
    firebase
      .database()
      .ref()
      .child('order')
      .on('value', (snapshoot) => {
        var data = snapshoot.val();
        this.orderlist = [];
        for (var item in data) {
          this.orderlist.unshift(data[item]);
        }
      //  this.orderlist=this.sortList(this.orderlist);
        let countListCopy = getListCount(this.orderlist)
        this.countList=countListCopy
      });
  }
  sortList(orderlist: any) {
    var sortedObjs = _.sortBy( orderlist, 'status' );
    sortedObjs=[...sortedObjs].reverse();
    orderlist=sortedObjs;
    return orderlist }
}


function getListCount(orderList:Array<Product>) {
  let list:CountList={
    total:0,
    inProgress:0,
    completed:0,
    onRoute:0
  }
  var assigned = orderList.filter(function (order:Product) {
    return order.status=="Assigned"||order.status=="Ready"||order.status=="Pending";
  });
  var onRoute = orderList.filter(function (order:Product) {
    return order.status=="In Route"
  });
  var completed = orderList.filter(function (order:Product) {
    return order.status=="Complete"
  });
 list.total=orderList.length;
  list.inProgress = assigned.length;
  list.onRoute=onRoute.length;
  list.completed=completed.length;
  return list;
}

