import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Store} from "../../model/store";
import {StoreService} from "../../service/store.service";
import {Product} from "../../model/product";
import {CartService} from '../../service/cart.service';
import {ProductComponent} from "../product/product.component";
import {MatDialog} from "@angular/material/dialog";
import {CartComponent} from "../shared/cart/cart.component";
import {ProductFormComponent} from "../product/product-form/product-form.component";

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  store: Store;
  onCharge: boolean = true;
  isOpen: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
              private storeService: StoreService,
              private dialog: MatDialog) {

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
  openDialog(){
    if(this.isOpen == false){
      const dialogRef = this.dialog.open(ProductFormComponent, {
        panelClass: 'app-full-bleed-dialog',
        data: {type: 'create',
               storeId: this.store.id
        }
      });
      this.isOpen = true
      dialogRef.afterClosed().subscribe(result => {
        this.store.products.push(result);
        this.isOpen = false;
      });
    }
  }

}
