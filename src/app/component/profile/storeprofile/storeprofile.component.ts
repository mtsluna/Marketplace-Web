import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MyErrorStateMatcher} from "../../register/register.component";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {City} from "../../../model/city";
import {State} from "../../../model/state";
import {ConfirmationService} from "primeng";
import {Store} from "../../../model/store";
import {StoreService} from "../../../service/store.service";
import {StoreArea} from "../../../model/storeArea";
import {Observable} from "rxjs";

@Component({
  selector: 'app-storeprofile',
  templateUrl: './storeprofile.component.html',
  styleUrls: ['./storeprofile.component.css'],
  providers: [ConfirmationService]
})
export class StoreprofileComponent implements OnInit {
  // IMAGE ATTRIBUTES TO MANAGE UPLOAD
  imageToUpload: any;
  urlImage: Observable<string>;
  uploadPercent: any;
  @ViewChild('imageStore') inputTareaImagen: ElementRef;
  //
  matcher = new MyErrorStateMatcher();
  public storeProfile: FormGroup;
  public store: Store;
  public cities: City[];
  public states: State[];
  stateId=1;
  countryid=1;
  hide=true;
  storeAreas: StoreArea[];
  constructor(private formBuilder: FormBuilder,
              private storeService: StoreService,
              private confirmationService: ConfirmationService) {
    this.buildForm();
  }

  ngOnInit(): void {
  }
  // BUILD FORMULARY
  buildForm(){
    this.storeProfile = this.formBuilder.group({
// BEGIN STORE FORM
      name: new FormControl('', [
        Validators.required,
      ]),
      CUIL: new FormControl('', [
        Validators.required,
      ]),
      businessName: new FormControl('', [
        Validators.required,
        Validators.maxLength(25),
      ]),
      user: this.formBuilder.group({

        username: new FormControl('', [
          Validators.required
        ]),
        password: new FormControl('', [
          Validators.required
        ]),
      }),
      address:this.formBuilder.group({

        street: new FormControl('', [
          Validators.required
        ]),
        number: new FormControl(null, [
          Validators.required,
          Validators.maxLength(5)
        ]),
        postalCode: new FormControl('', [
          Validators.required,
          Validators.maxLength(2)
        ]),
        city:this.formBuilder.group({
          id:new FormControl('', [
            Validators.required
          ])
        }),
      }),
      area: this.formBuilder.group({
        id: new FormControl('', [
          Validators.required
        ])
      })
      // END STORE FORM
    });
  }
  // USER UPDATE METHOD
  updateStoreProfile(store:any){
    this.confirmationService.confirm({
      message: '¿Deseas actualizar los datos?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.storeService.putById(this.store.id,store).subscribe( res => {
            console.log('Client updated succesfully');
          },
          error => {
            console.log('Client update error:'+ error.message);
          });

      },
      reject: () => {}
    });
  }

  onFileSelected(e: any){
    this.imageToUpload = e.target.files[0];
  }

}
