import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {CartComponent} from '../cart/cart.component';
import {Product} from '../../../model/product';
import {CartService} from '../../../service/cart.service';
import {TokenService} from '../../../service/token.service';
import {AuthService} from '../../../service/auth.service';
import {StoreService} from '../../../service/store.service';
import {Router} from '@angular/router';
import {Store} from '../../../model/store';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

    @Input() products: Product[];
    isOpen: boolean = false;
    items: number = 0;
    isLogged: boolean = false;

    constructor(public dialog: MatDialog,
                private cartService: CartService,
                public tokenService: TokenService,
                public authService: AuthService,
                private storeService: StoreService,
                private router: Router) {
    }


    ngOnInit(): void {
        this.cartService.getProducts().subscribe((data) => {
            let acum = 0;
            data.forEach((data) => {
                acum = acum += data.quantity;
            });
            this.items = acum;
        });
    }

    openDialog() {
        if (this.isOpen == false) {
            const dialogRef = this.dialog.open(CartComponent, {
                panelClass: 'app-full-bleed-dialog'
            });
            this.isOpen = true;
            dialogRef.afterClosed().subscribe(result => {
                if (result == 'compra!') {
                    //this.cartService.clearProduct();
                }
                this.isOpen = false;
            });
        }
    }

    logout() {
        //Clear token to logout user
        this.tokenService.saveRefreshTokenInStorage('');
        this.tokenService.saveTokenInStorage('');
        this.tokenService.saveRoleInStorage('');
        this.tokenService.saveUsernameInStorage('');
        this.authService.isLogged = false;
        console.log(localStorage.getItem('refreshToken'));
    }

    getStoreNumber() {
        this.storeService.getByUsername(this.tokenService.getUsernameFromStorage()).subscribe((data: Store) => {
            this.router.navigate(['/store/' + data[0].id]);
        });
    }

}
