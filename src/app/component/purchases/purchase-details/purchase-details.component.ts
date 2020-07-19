import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {StoreComponent} from "../../store/store.component";
import {PurchaseDetail} from "../../../model/purchaseDetail";
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-purchase-details',
  templateUrl: './purchase-details.component.html',
  styleUrls: ['./purchase-details.component.css']
})
export class PurchaseDetailsComponent implements OnInit {

  details = new MatTableDataSource<PurchaseDetail>();
  displayedColumns = ['name', 'quantity', 'price'];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    if(this.data.details.length > 0){
      this.details.data = this.data.details;
    }else{
      this.details.data = [];
    }

  }

  ngOnInit(): void {
  }

}
