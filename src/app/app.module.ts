import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TokenInterceptor} from './interceptor/token.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './component/register/register.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {MatListModule} from "@angular/material/list";
import {FlexModule} from "@angular/flex-layout";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {LobbyComponent} from "./component/lobby/lobby.component";
import {ReactiveFormsModule} from "@angular/forms";
import {ErrorStateMatcher, ShowOnDirtyErrorStateMatcher} from "@angular/material/core";
import { FormsModule } from '@angular/forms';
import { NavComponent } from './component/shared/nav/nav.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {FirstUpperPipe} from './pipe/first-upper.pipe';
import {MatBadgeModule} from '@angular/material/badge';
import { FooterComponent } from './component/shared/footer/footer.component';
import { StoreComponent } from './component/store/store.component';
import {MatSelectModule} from "@angular/material/select";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatStepperModule} from '@angular/material/stepper';
import {CartComponent} from './component/shared/cart/cart.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import { ClientprofileComponent } from './component/profile/clientprofile/clientprofile.component';
import {ConfirmDialogModule} from "primeng";
import {LogInComponent} from './component/log-in/log-in.component';
import {AuthService} from "./service/auth.service";
import { StoreAreaTableComponent } from './component/store-area-table/store-area-table.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { StoreAreaTableModalComponent } from './component/store-area-table/store-area-table-modal/store-area-table-modal.component';
import { ProductAreaTableComponent } from './component/product-area-table/product-area-table.component';
import { ProductAreaTableModalComponent } from './component/product-area-table/product-area-table-modal/product-area-table-modal.component';
import { ProfileComponent } from './component/profile/profile/profile.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { CanActivateLoginGuard } from './guards/can-activate-login-guard.service';
import { ProductComponent } from './component/product/product.component';
import { ProductFormComponent } from './component/product/product-form/product-form.component';
import { PurchasesComponent } from './component/purchases/purchases.component';
import {StoreprofileComponent} from './component/profile/storeprofile/storeprofile.component';
import {MaterialFileInputModule} from 'ngx-material-file-input';
import { PurchaseDetailsComponent } from './component/purchases/purchase-details/purchase-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LobbyComponent,
    RegisterComponent,
    NavComponent,
    FirstUpperPipe,
    FooterComponent,
    NavComponent,
    StoreComponent,
    ClientprofileComponent,
    LogInComponent,
    ProfileComponent,
    CartComponent,
    StoreAreaTableComponent,
    ProductComponent,
    ProductFormComponent,
    StoreAreaTableModalComponent,
    ProductAreaTableComponent,
    ProductAreaTableModalComponent,
    PurchasesComponent,
    StoreprofileComponent,
    PurchaseDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    FlexModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatStepperModule,
    MatTableModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressBarModule,
    ConfirmDialogModule,
    MaterialFileInputModule
  ],
  providers: [
    AuthService,
    CanActivateLoginGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: ErrorStateMatcher,
      useClass: ShowOnDirtyErrorStateMatcher
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
