import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {PurchaseDetail} from '../model/purchaseDetail';
import {Product} from '../model/product';
import {ProductDetail} from '../model/productDetail';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  products: PurchaseDetail[] = []
  subject = new BehaviorSubject(this.products)

  constructor() {
    if(localStorage.getItem('products') != undefined){
      this.products = JSON.parse(localStorage.getItem('products'))
      this.subject.next(this.products)
    }
  }

  getProducts(){
    return this.subject
  }

  addProduct(product: Product){
    const result = this.products.filter(item => item.product.id == product.id)
    if (result.length > 0) {
      if(result[0].quantity < 99){
        this.products.splice(this.products.indexOf(result[0]), 1)
        result[0].quantity++
        this.products.push(result[0])
      }
    } else {
      const purchaseDetail = new PurchaseDetail()
      purchaseDetail.product = product
      purchaseDetail.quantity = 1
      this.products.push(purchaseDetail)
    }

    localStorage.setItem('products', JSON.stringify(this.products))
    this.subject.next(this.products)
  }

  removeProduct(product: Product){
    const result = this.products.filter(item => item.product.id == product.id)
    if(result.length > 0){
      if(result[0].quantity > 0){
        this.products.splice(this.products.indexOf(result[0]), 1)
        result[0].quantity--
        if(result[0].quantity > 0){
          this.products.push(result[0])
        }
      }
    }

    localStorage.setItem('products', JSON.stringify(this.products))
    this.subject.next(this.products)
  }

  clearProduct(){
    this.products = [];
    localStorage.setItem('products', JSON.stringify(this.products));
    this.subject.next(this.products)
  }

  countProducts(){
    return this.products.length
  }

}
