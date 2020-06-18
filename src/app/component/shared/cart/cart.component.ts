import {Component, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {Product} from '../../../model/product';
import {CartService} from '../../../service/cart.service';
import {BehaviorSubject, Subscription} from 'rxjs';
import {ProductDetail} from '../../../model/productDetail';
import {PurchaseDetail} from '../../../model/purchaseDetail';
import {MatTableDataSource} from '@angular/material/table';
import {Purchase} from '../../../model/purchase';
import {ClientService} from '../../../service/client.service';
import {TokenService} from '../../../service/token.service';
import {Client} from '../../../model/client';
import {PurchaseService} from '../../../service/purchase.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  items: number = 0;
  total: number = 0;
  products: PurchaseDetail [] = [];
  itemsForPurchase: PurchaseDetail [] = [];
  displayedColumns: string[] = ['name', 'quantity', 'price'];
  error: string = '';
  button: boolean = true;

  constructor(private cartService: CartService,
              private clientService: ClientService,
              private tokenService: TokenService,
              private purchaseService: PurchaseService,
              public dialogRef: MatDialogRef<CartComponent>) {
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  ngOnDestroy(): void {

  }

  getAllProducts() {
    this.cartService.getProducts().subscribe((data) => {
      this.products = data;
      this.getTotal();
      this.getQuantity();
    });
  }

  getTotal() {
    this.total = this.products.map((data) => {
      return data.quantity * data.product.price;
    }).reduce((acum, value) => acum + value);
  }

  getQuantity() {
    this.items = this.products.map((data) => {
      return data.quantity;
    }).reduce((acum, value) => acum + value);
  }

  addOneProduct(product: Product) {
    this.cartService.addProduct(product);
  }

  removeOneProduct(product: Product) {
    this.cartService.removeProduct(product);
  }

  clearAllProducts() {
    this.cartService.clearProduct();
    this.items = 0;
    this.total = 0;
  }

  solicitar() {
    let purchaseG;
    let clear: boolean = false;
    this.button = false;
    this.clientService.getByUsername(this.tokenService.getUsernameFromStorage()).subscribe((client: Client) => {
      this.cartService.getProducts().subscribe((data)=>{
        let purchase: Purchase = {
          details: data,
          date: new Date().toDateString(),
          // @ts-ignore
          client: {
            id: client[0].id
          }
        };
        purchaseG = purchase;
        this.tokenService.getTokenForRefreshHttp().subscribe((data) => {
          this.tokenService.saveTokenInStorage(data.token);
          this.tokenService.saveRefreshTokenInStorage(data.refresh_token);
          this.purchaseService.post(purchaseG).subscribe((purchase) => {
            this.error = 'no';
            setTimeout(()=>{
              this.dialogRef.close('compra!')
            }, 5000)
          }, (error) => {
            this.error = 'yes';
          });
        });
      });
    });
  }

}
