import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {CartComponent} from '../cart/cart.component';
import {Product} from '../../../model/product';
import {CartService} from '../../../service/cart.service';
import {TokenService} from "../../../service/token.service";
import {AuthService} from "../../../service/auth.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  @Input() products: Product[]
  isOpen: boolean = false
  items: number = 0

  constructor(public dialog: MatDialog,
              private cartService: CartService,
              private tokenService: TokenService,
              private authService: AuthService) {

  }

  ngOnInit(): void {
    this.cartService.getProducts().subscribe((data)=>{
      let acum = 0
      data.forEach((data)=>{
        acum = acum += data.quantity
      })
      this.items = acum
    })
  }

  openDialog() {
    if(this.isOpen == false){
      const dialogRef = this.dialog.open(CartComponent, {
        panelClass: 'app-full-bleed-dialog'
      });
      this.isOpen = true
      dialogRef.afterClosed().subscribe(result => {
        this.isOpen = false;
      });
    }
  }

  logout(){
    //Clear token to logout user
    this.tokenService.saveRefreshTokenInStorage('');
    this.tokenService.saveTokenInStorage('');
    this.authService.isLogged = false;
    console.log(localStorage.getItem('refreshToken'))
  }
}
