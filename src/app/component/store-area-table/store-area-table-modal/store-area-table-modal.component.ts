import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {StoreArea} from '../../../model/storeArea';
import {StoreAreaService} from '../../../service/store-area.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-store-area-table-modal',
  templateUrl: './store-area-table-modal.component.html',
  styleUrls: ['./store-area-table-modal.component.css']
})
export class StoreAreaTableModalComponent implements OnInit {

  public storeAreaObject: StoreArea = {
    id: null,
    name: '',
    description: ''
  };
  public storeArea: FormGroup;
  success: boolean = false;
  failure: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private storeAreaService: StoreAreaService,
              @Inject(MAT_DIALOG_DATA) public data: StoreArea) {
    this.buildStoreArea()
    if(data.id == null){
      data.id = 0;
      data.name = '';
      data.description = '';
    }
    this.storeArea.setValue(data)
  }

  ngOnInit(): void {
  }

  public buildStoreArea(){
    this.storeArea = this.formBuilder.group({
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

  public saveStoreArea(){
    console.log('asdas')
    if(this.storeArea.value.id == 0){
      this.storeArea.value.id = null;
      this.storeAreaService.post(this.storeArea.value).subscribe((data)=>{
        this.success = true;
      }, (error)=>{
        this.failure = true;
      });
    }
    else{
      this.storeAreaService.putById(this.storeArea.value.id, this.storeArea.value).subscribe((data)=>{
        this.success = true;
      }, (error)=>{
        this.failure = true;
      });
    }
  }

}
