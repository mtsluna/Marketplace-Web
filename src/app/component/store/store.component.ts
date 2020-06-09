import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Store} from "../../model/store";
import {StoreService} from "../../service/store.service";
import {Product} from "../../model/product";
import {CartService} from '../../service/cart.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  store: Store;
  onCharge: boolean = true;

  constructor(private activatedRoute: ActivatedRoute,
              private storeService: StoreService,
              private cartService: CartService) {

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

  addProduct(product: Product){
    this.cartService.addProduct(product)
  }

}
