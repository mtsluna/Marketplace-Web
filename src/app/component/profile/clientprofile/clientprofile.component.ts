import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from '../../register/register.component';
import {ClientService} from '../../../service/client.service';
import {City} from '../../../model/city';
import {State} from '../../../model/state';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationService} from 'primeng';
import {Client} from '../../../model/client';
import {Address} from '../../../model/address';
import {Purchase} from '../../../model/purchase';
import {User} from '../../../model/user';
import {CityService} from '../../../service/city.service';
import {StateService} from '../../../service/state.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-clientprofile',
  templateUrl: './clientprofile.component.html',
  styleUrls: ['./clientprofile.component.css'],
  providers: [ConfirmationService]
})
export class ClientprofileComponent implements OnInit {

  matcher = new MyErrorStateMatcher();
  public clientProfile: FormGroup;
  public cities: City[];
  client: Client;
  public states: State[];
  stateId = 1;
  countryid = 1;
  created = false;
  onCharge: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private clientService: ClientService,
              private confirmationService: ConfirmationService,
              private cityService: CityService,
              private stateService: StateService,
              private router: Router) {
    this.client = new Client();
    this.getCitiesandStates();
    this.buildForm();
  }

  ngOnInit(): void {
    this.getUserandBuildForm(localStorage.getItem('username'));
  }

  // ARMO EL FORMULARIO
  buildForm() {
    this.clientProfile = this.formBuilder.group({
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
        Validators.pattern('^[0-9]+$')
      ]),
      user: this.formBuilder.group({
        username: new FormControl({value: '', disabled: true}, [
          Validators.required

        ])
      }),
      address: this.formBuilder.group({

        street: new FormControl('', [
          Validators.required
        ]),
        number: new FormControl('', [
          Validators.required,
          Validators.maxLength(5)
        ]),
        postalCode: new FormControl('', [
          Validators.required,
          Validators.maxLength(5)
        ]),
        city: this.formBuilder.group({
          id: new FormControl('', [
            Validators.required
          ])
        }),
      }),
      // FIN USUARIO
    });
  }

  // METODO QUE HACE EL UPDATE DEL USUARIO
  updateClientProfile(client: any) {
    this.confirmationService.confirm({
      message: '¿Deseas actualizar los datos?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.clientService.putById(this.client.id, client).subscribe(res => {
            console.log('Client updated succesfully');
            window.location.reload();
          },
          error => {
            console.log('Client update error:' + error.message);
          });

      },
      reject: () => {
        window.location.reload();
      }
    });
  }

  getUserandBuildForm(username: string) {
    this.onCharge = true;
    this.clientService.getByUsername(username).subscribe(async (data: Client) => {
      if (data[0] == null) {
        console.log('User not found');
      } else {
        this.client = await data[0];
        this.stateId = this.client.address.city.state.id;
        this.created = true;
        this.onCharge = false;
        this.clientProfile.patchValue(this.client);
      }
    }, error => {
      console.log('An error has ocurred: ' + error.message);
    });
  }

  getCitiesandStates() {
    this.stateService.getAll().subscribe(data => {
      this.states = data;
    });
    this.cityService.getAll().subscribe(data => {
      this.cities = data;
    });
  }
}
