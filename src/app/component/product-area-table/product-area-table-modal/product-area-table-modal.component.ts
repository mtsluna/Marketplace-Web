import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductArea} from '../../../model/productArea';
import {StoreAreaService} from '../../../service/store-area.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {StoreArea} from '../../../model/storeArea';
import {ProductAreaService} from '../../../service/product-area.service';

@Component({
  selector: 'app-product-area-table-modal',
  templateUrl: './product-area-table-modal.component.html',
  styleUrls: ['./product-area-table-modal.component.css']
})
export class ProductAreaTableModalComponent implements OnInit {

  public productAreaObject: ProductArea = {
    id: null,
    name: '',
    description: ''
  };
  public productArea: FormGroup;
  success: boolean = false;
  failure: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private productAreaService: ProductAreaService,
              @Inject(MAT_DIALOG_DATA) public data: ProductArea) {
    this.buildProductArea()
    if(data.id == null){
      data.id = 0;
      data.name = '';
      data.description = '';
    }
    this.productArea.setValue(data)
  }

  ngOnInit(): void {
  }

  public buildProductArea(){
    this.productArea = this.formBuilder.group({
        id: new FormControl(),
        name: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.nullValidator
        ]),
        description: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.nullValidator
        ])
      }
    )
  };

  public saveProductArea(){
    if(this.productArea.value.id == 0){
      this.productArea.value.id = null;
      this.productAreaService.post(this.productArea.value).subscribe((data)=>{
        this.success = true;
      }, (error)=>{
        this.failure = true;
      });
    }
    else{
      this.productAreaService.putById(this.productArea.value.id, this.productArea.value).subscribe((data)=>{
        this.success = true;
      }, (error)=>{
        this.failure = true;
      });
    }
  }

}
