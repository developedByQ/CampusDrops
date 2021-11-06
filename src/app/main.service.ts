import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class MainService {
  public ItemList: any = [];
  public itemList: any = [];
  public globelId: any;
  public checkoutList: any = [];
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
      });
  }
}
