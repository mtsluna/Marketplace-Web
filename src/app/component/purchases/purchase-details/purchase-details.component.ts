import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {StoreComponent} from "../../store/store.component";
import {PurchaseDetail} from "../../../model/purchaseDetail";

@Component({
  selector: 'app-purchase-details',
  templateUrl: './purchase-details.component.html',
  styleUrls: ['./purchase-details.component.css']
})
export class PurchaseDetailsComponent implements OnInit {
  details: PurchaseDetail[];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data);
    if(this.data.details.length > 0){
      this.details = this.data.details;
    }else{
      this.details = null;
    }

  }

  ngOnInit(): void {
  }

}
