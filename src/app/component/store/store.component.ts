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
import {TokenService} from '../../service/token.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  store: Store;
  onCharge: boolean = true;
  isOpen: boolean = false;
  rol: string = '';
  username: string = '';

  constructor(private activatedRoute: ActivatedRoute,
              private storeService: StoreService,
              private dialog: MatDialog,
              private tokenService: TokenService) {

    this.onCharge = true;
    this.rol = tokenService.getRoleFromStorage();
    this.username = tokenService.getUsernameFromStorage();
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
        console.log(result)
        if(result != undefined){
            this.store.products.push(result);
        }
        this.isOpen = false;
      });
    }
  }

  replace(e: Product){
    let array = this.store.products.filter((product)=> product.id == e.id);
    if(array.length > 0){
      console.log(this.store.products.indexOf(array[0]));
      this.store.products.splice(this.store.products.indexOf(array[0]), 1);
      this.store.products.push(e);
    }
  }

  delete(e){
    let array = this.store.products.filter((product)=> product.id == e.id);
    if(array.length > 0){
      console.log(this.store.products.indexOf(array[0]));
      this.store.products.splice(this.store.products.indexOf(array[0]), 1);
    }
  }

}
