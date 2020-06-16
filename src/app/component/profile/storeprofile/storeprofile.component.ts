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
import {CityService} from "../../../service/city.service";
import {StateService} from "../../../service/state.service";
import {StoreAreaService} from "../../../service/store-area.service";
import {ImageService} from "../../../service/image.service";
import {Image} from "../../../model/image";

@Component({
  selector: 'app-storeprofile',
  templateUrl: './storeprofile.component.html',
  styleUrls: ['./storeprofile.component.css'],
  providers: [ConfirmationService]
})
export class StoreprofileComponent implements OnInit {
  // IMAGE ATTRIBUTES TO MANAGE UPLOAD
  imageToUpload: any;
  image: Image;
  uploadPercent = '0';
  @ViewChild('imageStore') inputTareaImagen: ElementRef;
  //
  matcher = new MyErrorStateMatcher();
  public storeProfile: FormGroup;
  public store: Store;
  public cities: City[];
  public states: State[];
  stateId=1;
  countryid=1;
  created: boolean = false;
  onCharge: boolean = false;
  storeAreas: StoreArea[];
  constructor(private formBuilder: FormBuilder,
              private storeService: StoreService,
              private confirmationService: ConfirmationService,
              private cityService: CityService,
              private stateService: StateService,
              private storeAreaService: StoreAreaService,
              private imageService: ImageService) {
    this.store = new Store();
    this.uploadPercent = '0';
    this.getCitiesandStates();
    this.getStoreandBuildForm(localStorage.getItem('username'));
  }

  ngOnInit(): void {
  }
  // BUILD FORMULARY
  buildForm(){
    this.storeProfile = this.formBuilder.group({
// BEGIN STORE FORM
      name: new FormControl(this.store.name, [
        Validators.required,
      ]),
      CUIL: new FormControl(this.store.CUIL, [
        Validators.required,
      ]),
      businessName: new FormControl(this.store.businessName, [
        Validators.required,
        Validators.maxLength(25),
      ]),
      user: this.formBuilder.group({
        username: new FormControl({value:this.store.user.username, disabled: true}, [
          Validators.required
        ]),
      }),
      address:this.formBuilder.group({

        street: new FormControl(this.store.address.street, [
          Validators.required
        ]),
        number: new FormControl(this.store.address.number, [
          Validators.required,
          Validators.maxLength(5)
        ]),
        postalCode: new FormControl(this.store.address.postalCode, [
          Validators.required,
          Validators.maxLength(5),
          Validators.minLength(3)
        ]),
        city:this.formBuilder.group({
          id:new FormControl(this.store.address.city.id, [
            Validators.required
          ])
        }),
      }),
      area: this.formBuilder.group({
        id: new FormControl(this.store.area.id, [
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
            console.log('Store updated succesfully');
            window.location.reload();
          },
          error => {
            console.log('Client update error:'+ error.message);
          });

      },
      reject: () => {
        window.location.reload();
      }
    });
  }
// Detect file changes in file input
  onFileSelected(e: any){
    this.imageToUpload = e.target.files[0];
  }
  // Upload the file to imgur and get the id and url
onUpload(){
    const formData = new FormData();
    formData.append('file', this.imageToUpload);
    this.imageService.post(formData).subscribe( async(data) =>{
      this.store.image = await data;
      this.uploadPercent = '50';
      this.storeService.putById(this.store.id, this.store).subscribe( res =>{
        console.log('Image added/updated succesfully');
        this.uploadPercent = '100';
        window.location.reload();
      },
        error => {
        console.log('An error has ocurred: '+error);
        this.uploadPercent = '0';
        }
        );

    },
      error => {
      console.log('An error has ocurred: '+ error);
      this.uploadPercent = '0';
      }
      );
}

  // Get method for the store profile and then we build the form
  getStoreandBuildForm(username: string){
    this.onCharge = true;
    this.storeService.getByUsername(username).subscribe(async(data: Store) =>{
      if(data[0] != null){
      this.store = await data[0];
      this.stateId = this.store.address.city.state.id;
      this.buildForm();
      this.created = true;
      this.onCharge = false;
      }else{
        console.log('Store not found');
      }
    },error => {
      console.log('An error has ocurred: '+ error.message);
    });
  }

  getCitiesandStates(){
    this.stateService.getAll().subscribe( data =>{
      this.states = data;
    });
    this.cityService.getAll().subscribe( data => {
      this.cities = data;
    });
    this.storeAreaService.getAll().subscribe( data =>{
      this.storeAreas = data;
    });
  }
}
