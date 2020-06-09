import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Product} from '../../../model/product';
import {CartService} from '../../../service/cart.service';
import {BehaviorSubject, Subscription} from 'rxjs';
import {ProductDetail} from '../../../model/productDetail';
import {PurchaseDetail} from '../../../model/purchaseDetail';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  items: number = 0;
  total: number = 0;
  products: PurchaseDetail [] = [];
  displayedColumns: string[] = ['name', 'quantity', 'price']

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.getAllProducts()
  }

  ngOnDestroy(): void {

  }

  getAllProducts(){
   this.cartService.getProducts().subscribe((data)=>{
     this.products = data;
     this.getTotal();
     this.getQuantity()
   })
  }

  getTotal(){
    this.total = this.products.map((data)=>{
      return data.quantity * data.product.price
    }).reduce((acum, value)=> acum + value);
  }

  getQuantity(){
    this.items = this.products.map((data)=>{
      return data.quantity
    }).reduce((acum, value) => acum + value);
  }

  addOneProduct(product: Product){
    this.cartService.addProduct(product)
  }

  removeOneProduct(product: Product){
    this.cartService.removeProduct(product)
  }

  clearAllProducts(){
    this.cartService.clearProduct()
    this.items = 0
    this.total = 0
  }

}
