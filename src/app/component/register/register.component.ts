import { Component, OnInit } from '@angular/core';
import {ErrorStateMatcher} from "@angular/material/core";
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {User} from "../../model/user";
import {ClientService} from "../../service/client.service";
import {Store} from "../../model/store";
import {CityService} from "../../service/city.service";
import {StateService} from "../../service/state.service";
import {City} from "../../model/city";
import {State} from "../../model/state";
import {StoreService} from "../../service/store.service";
import {StoreAreaService} from '../../service/store-area.service';
import {StoreArea} from "../../model/storeArea";
import {Router} from "@angular/router";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  matcher = new MyErrorStateMatcher();
  public registerUser: FormGroup;
  public registerStore: FormGroup;
  hide = true;
  formtype = 'client';
  public cities: City[];
  public states: State[];
  public countryid = 1;
  public stateId: number;
  public storeAreas: StoreArea[];
  constructor(private formBuilder: FormBuilder,
              private clientService: ClientService,
              private cityService: CityService,
              private stateService: StateService,
              private storeService: StoreService,
              private storeAreaService: StoreAreaService,
              private router: Router) {

    this.buildClientForm();
    this.buildStoreForm();
    this.getStates();
    this.getCities();
    this.getAreas();
  }

  ngOnInit(): void {
  }

  public buildClientForm(){

    this.registerUser = this.formBuilder.group({
// Inicio USUARIO
      name: new FormControl('', [
        Validators.required,
      ]),
      surname: new FormControl('', [
        Validators.required,
      ]),
      dni: new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern("^[0-9]+$")
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
          Validators.maxLength(5)
        ]),
        city:this.formBuilder.group({
          id:new FormControl('', [
            Validators.required
          ])
        }),
      }),

      // FIN USUARIO
    });

  }
  public buildStoreForm(){
    this.registerStore = this.formBuilder.group({
// Inicio USUARIO
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
      // FIN USUARIO
    });

  }

  registerClientForm(client: any){

    this.clientService.post(client).subscribe((res) => {
      console.log('Client created succesfully:'+ res);
      this.router.navigateByUrl('/login');
    },
      error => {
        console.log('Error has ocurred: '+ error.message);
      });
    console.log(client);
  }
  registerStoreForm(store: any){
    console.log(store);
    this.storeService.post(store).subscribe( (res) => {
      console.log('Store created succesfully');
      this.router.navigateByUrl('/login');
    },
      error => {
        console.log('Ocurrio un error: ' + error.message);
      }
      );
  }
  changeFormType(){
    if(this.formtype == 'client'){
      this.formtype = 'store';
      this.registerUser.reset();
    }else{
      this.formtype = 'client';
      this.registerStore.reset();
    }
  }

  getCities(){
      this.cityService.getAll().subscribe( data => {
          this.cities = data;
          console.log(data);
        });
  }
  getStates(){
      this.stateService.getAll().subscribe(data=>{
        this.states = data;
        console.log(data);
      });
  }
  getAreas(){
    this.storeAreaService.getAll().subscribe( data =>{
      this.storeAreas = data;
    });
  }
}
