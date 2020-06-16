import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../model/product";
import {CartService} from "../../service/cart.service";
import {ProductFormComponent} from "./product-form/product-form.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() productCard: Product;
  isOpen: boolean = false;
  constructor(private cartService: CartService,
              private dialog: MatDialog) {

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
        this.isOpen = false;
      });
    }
  }
}
