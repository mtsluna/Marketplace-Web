import { Component, OnInit } from '@angular/core';
import {ErrorStateMatcher} from "@angular/material/core";
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {User} from "../../model/user";

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

  newuser: User;
  matcher = new MyErrorStateMatcher();
  public registerUser: FormGroup;
  hide = true;
  constructor(private formBuilder: FormBuilder) {

    this.buildForm();
  }

  ngOnInit(): void {
  }

  public buildForm(){

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
      ]),
      username: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ])

      // FIN USUARIO
    });

  }

  registerClientForm(usuario: User){

  }

}
