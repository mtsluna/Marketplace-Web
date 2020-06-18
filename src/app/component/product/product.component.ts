import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "../../model/product";
import {CartService} from "../../service/cart.service";
import {ProductFormComponent} from "./product-form/product-form.component";
import {MatDialog} from "@angular/material/dialog";
import {TokenService} from '../../service/token.service';
import {ProductService} from '../../service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() productCard: Product;
  @Input() rol: string;
  @Input() username: string;
  @Input() usernameStorage;
  @Output() productEvent = new EventEmitter<Product>();
  @Output() productEventDelete = new EventEmitter<Product>();
  isOpen: boolean = false;
  constructor(private cartService: CartService,
              private dialog: MatDialog,
              private tokenService: TokenService,
              private productService: ProductService) {
    this.usernameStorage = tokenService.getUsernameFromStorage()
  }

  ngOnInit(): void {  }

  addProduct(product: Product){
    this.cartService.addProduct(product);
  }

  openDialog(product: Product){
    if(this.isOpen == false){
      const dialogRef = this.dialog.open(ProductFormComponent, {
        panelClass: 'app-full-bleed-dialog',
        data: {product: product}

      });
      this.isOpen = true
      dialogRef.afterClosed().subscribe(result => {
        this.productEvent.emit(result);
        this.isOpen = false;
      });
    }
  }

  delete(product: Product){
    this.productService.deleteById(product.id).subscribe((data)=>{
      this.productEventDelete.emit(product)
    },(error)=>{

    })
  }
}
