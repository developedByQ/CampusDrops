import { Injectable } from '@angular/core';
import firebase from "firebase";
import {Subject} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class MainService {
 public ItemList:any=[];
 public dataRec:Subject<any>=new Subject();
  constructor() {
    let uid:any=firebase.auth().currentUser?.uid;


    this.getAllItem();
  }
  getAllItem(){
    firebase.database().ref().child('allItems').once('value',(SnapShoot)=>{
      var data=SnapShoot.val();
      for(var item in data){
        this.ItemList.push(data[item]);
        this.dataRec.next("data");
        console.log(this.ItemList);
      }
    });

  }
}
