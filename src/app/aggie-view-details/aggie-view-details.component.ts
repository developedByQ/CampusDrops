import { Component, OnInit } from '@angular/core';
import { MainService } from './../main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aggie-view-details',
  templateUrl: './aggie-view-details.component.html',
  styleUrls: ['./aggie-view-details.component.css'],
})
export class AggieViewDetailsComponent implements OnInit {
  public itemDetail: any = {};
  constructor(public service: MainService, public router: Router) {
    if (this.service.globelId) {
      debugger;
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
      this.router.navigateByUrl('/checkout');
    }
  }
}
