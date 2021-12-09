import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';
import { Router } from '@angular/router';
import { MainService } from '../main.service';

@Component({
  selector: 'app-aggie-home',
  templateUrl: './aggie-home.component.html',
  styleUrls: ['./aggie-home.component.css'],
})
export class AggieHomeComponent implements OnInit {
  private route: Router;
  public currentVenderproductList: any = [];

  constructor(route: Router, public service: MainService) {
    this.route = route;
  }

  ngOnInit(): void {
    this.service.getAllItem();
    this.service.getAllOrder();
    this.service.dataRec.subscribe(() => {
      for (var item in this.service.ItemList) {
        this.currentVenderproductList.push(this.service.ItemList[item]);
        this.service.itemList.push(this.service.ItemList[item]);
      }
    });
  }

  viewItemDetail() {
    this.route.navigate(['/aggieviewdetail']).then((r) => {});
  }

}
