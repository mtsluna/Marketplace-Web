import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MyErrorStateMatcher} from "../../register/register.component";
import {ClientService} from "../../../service/client.service";
import {City} from "../../../model/city";
import {State} from "../../../model/state";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationService} from "primeng";
import {Client} from "../../../model/client";

@Component({
  selector: 'app-clientprofile',
  templateUrl: './clientprofile.component.html',
  styleUrls: ['./clientprofile.component.css'],
  providers: [ConfirmationService]
})
export class ClientprofileComponent implements OnInit {

matcher = new MyErrorStateMatcher();
public userProfile: FormGroup;
public client: Client;
public cities: City[];
public states: State[];
stateId=1;
countryid=1;
hide=true;
  constructor(private formBuilder: FormBuilder,
              private clientService: ClientService,
              private confirmationService: ConfirmationService) {
this.buildForm();
  }

  ngOnInit(): void {
  }
  // ARMO EL FORMULARIO
  buildForm(){
    this.userProfile = this.formBuilder.group({
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
      username: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
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
  // METODO QUE HACE EL UPDATE DEL USUARIO
updateClientProfile(client:any){
    this.confirmationService.confirm({
      message: '¿Deseas actualizar los datos?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.clientService.putById(this.client.id,client).subscribe( res => {
            console.log('Client updated succesfully');
          },
          error => {
            console.log('Client update error:'+ error.message);
          });

      },
      reject: () => {}
    });


}
}
