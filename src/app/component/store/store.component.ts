import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Store} from "../../model/store";
import {StoreService} from "../../service/store.service";
import {Product} from "../../model/product";

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  store: Store;
  onCharge: boolean = true;

  constructor(private activatedRoute: ActivatedRoute,
              private storeService: StoreService) {

    this.onCharge = true;

    this.activatedRoute.params.subscribe( params => {
      this.storeService.getById(params['id']).subscribe( data =>{
        this.store = data;
        this.onCharge = false;
      });
    });
  }

  ngOnInit(): void {
  }

}
