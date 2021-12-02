import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../main.service';

@Component({
  selector: 'app-driver-viewall',
  templateUrl: './driver-viewall.component.html',
  styleUrls: ['./driver-viewall.component.css'],
})
export class DriverViewallComponent implements OnInit {
  private route: Router;
  public currentVendor: string | undefined = '';
  public currentVenderproductList: any = [];
  constructor(route: Router, public service: MainService) {
    this.route = route;
  }

  ngOnInit(): void {
    // @ts-ignore
    // this.currentVendor = firebase.auth().currentUser.uid;
    // console.log(this.currentVendor);
    this.service.dataRec.subscribe(() => {
      for (var item in this.service.ItemList) {
        // if (this.service.ItemList[item].vendor == "WbCXGlmEUgR4T4OAGsojTxbpz662") {
        this.currentVenderproductList.push(this.service.ItemList[item]);
        // } else {
        //   console.log(this.service.ItemList[item].vendor);
        // }
      }
    });
  }
}
