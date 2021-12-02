import { Component, OnInit } from '@angular/core';
import { MainService } from './../main.service';
import { Router } from '@angular/router';
import firebase from 'firebase';

@Component({
  selector: 'app-aggie-view-details',
  templateUrl: './aggie-view-details.component.html',
  styleUrls: ['./aggie-view-details.component.css'],
})
export class AggieViewDetailsComponent implements OnInit {
  public itemDetail: any = {};
  public name: string = '';
  public address: string = '';
  public contact: string = '';
  showingBilling = true;
  public payment: string = '';

  constructor(public service: MainService, public router: Router) {
    if (this.service.globelId) {
      //debugger;
      var index = this.service.itemList.findIndex(
        (ob: { itemID: any }) => ob.itemID == this.service.globelId
      );
      if (index >= 0) {
        this.itemDetail = this.service.itemList[index];
      }
    } else {
      this.router.navigateByUrl('aggiehome');
    }
  }

  ngOnInit(): void {}
  checkout(id: any) {
    var index = this.service.itemList.findIndex(
      (ob: { itemID: any }) => ob.itemID == id
    );
    if (index >= 0) {
      this.service.checkoutList.push(this.service.itemList[index]);
      //this.router.navigateByUrl('/checkout');
      this.placeOrder();
    }
  }

  placeOrder() {
    var databaseRef = firebase.database().ref();
    var key: any = databaseRef.push().key;

    var index = this.service.checkoutList.findIndex(
      (ob: { itemID: any }) => ob.itemID == this.service.globelId
    );
    if (index >= 0) {
      var obj = {
        orderkey: key,
        name: this.name,
        address: this.address,
        contact: this.contact,
        payment: this.payment,
        itemImage: this.service.checkoutList[index].itemImage,
        price: this.service.checkoutList[index].price,
        itemName: this.service.checkoutList[index].itemName,
        description: this.service.checkoutList[index].description,
        status: 'Pending',
      };
      databaseRef
        .child('order')
        .child(key)
        .update(obj)
        .then(() => {
          // alert('order place successfully.');
          this.router.navigateByUrl('/aggiehome');
        });

      this.updateCount(key);
    }
  }
  updateCount(key: any) {
    let obj = {
      quantity: --this.itemDetail.quantity,
    };
    firebase
      .database()
      .ref()
      .child('allItems')
      .child(key)
      .update(obj)
      .then(() => {
        alert('Order placed Successfully');
      })
      .catch((error) => {});
  }
  gotoViewAllItems() {
    this.router.navigate(['/viewitems']).then((r) => {});
  }
}
