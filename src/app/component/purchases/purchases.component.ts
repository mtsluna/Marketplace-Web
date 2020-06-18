import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ClientService} from "../../service/client.service";
import {Client} from "../../model/client";
import {Purchase} from "../../model/purchase";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {ProductFormComponent} from "../product/product-form/product-form.component";
import {MatDialog} from "@angular/material/dialog";
import {PurchaseDetailsComponent} from "./purchase-details/purchase-details.component";

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css']
})
export class PurchasesComponent implements OnInit, AfterViewInit {
  client: Client;
  displayedColumns: string[] = ['id', 'date', 'details', 'total'];
  dataSource = new MatTableDataSource();
  onCharge: boolean = false;
  isOpen: boolean = false;
  constructor(private clientService: ClientService,
              private dialog: MatDialog) {
    this.getUser(localStorage.getItem('username'));
  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  getUser(username: string) {
    this.onCharge = true;
    this.clientService.getByUsername(username).subscribe(async (data: Client) => {
      this.client = await data[0];
      this.dataSource.data = this.client.purchases;
      console.log(this.client);
      this.onCharge = false;
    }, error => {
      console.log('An error has ocurred: ' + error.message);
    });
  }

  openDetails(product: any) {
    console.log(product);
    if(this.isOpen == false){
      const dialogRef = this.dialog.open(PurchaseDetailsComponent, {
        panelClass: 'app-full-bleed-dialog',
        data: {
          details: product.details
        }
      });
      this.isOpen = true
      dialogRef.afterClosed().subscribe(result => {
        this.isOpen = false;
      });
    }
  }
}
