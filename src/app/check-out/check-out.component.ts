import { Component, OnInit } from '@angular/core';
import { MainService } from './../main.service';
import { Router } from '@angular/router';
import firebase from 'firebase';
@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css'],
})
export class CheckOutComponent implements OnInit {
  public payment: string = '';
  public onlinePayment: boolean = false;
  public name: string = '';
  public address: string = '';
  public contact: string = '';
  constructor(public service: MainService, public router: Router) {
    if (this.service.checkoutList.length == 0) {
      this.router.navigateByUrl('aggiehome');
    }
  }

  ngOnInit(): void {}
  PlaceOrder() {
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
        status: 'pending',
      };
      databaseRef
        .child('order')
        .child(key)
        .update(obj)
        .then(() => {
          alert('order place successfully.');
          this.router.navigateByUrl('/aggiehome');
        });
    }
  }

  Transaction() {
    this.onlinePayment = true;
    alert('Transaction Successfully');
  }
}
