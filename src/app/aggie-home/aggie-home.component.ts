import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';
import { Router } from '@angular/router';
import { MainService } from '../main.service';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-aggie-home',
  templateUrl: './aggie-home.component.html',
  styleUrls: ['./aggie-home.component.css'],
})
export class AggieHomeComponent implements OnInit {
  private route: Router;
  public currentVenderproductList: any = [];
  userID: string = '';

  constructor(
    route: Router,
    public service: MainService,
    private location: PlatformLocation
  ) {
    this.route = route;
  }

  ngOnInit(): void {
    if (firebase.auth().currentUser?.uid) {
      this.userID = firebase.auth().currentUser!.uid;
    }
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
