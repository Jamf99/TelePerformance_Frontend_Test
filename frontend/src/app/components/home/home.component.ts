import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import Swal from 'sweetalert2';

class CustomValidators {
  static passwordsMatch(control: AbstractControl) : ValidationErrors {
    const password = control.get('password')!.value;
    const confirmPassword = control.get('confirmPassword')!.value;

    if((password === confirmPassword) && (password != null && confirmPassword != null)) {
      return null as any;
    }else {
      return {passwordsNotMatching: true};
    }
  }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  registerForm : FormGroup; 
  hide : boolean = true;
  selected = 'user';
  constructor(
    private authService : AuthenticationService,
    private formBuilder: FormBuilder,
    private router : Router
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email : new FormControl(null, [Validators.required, Validators.email]),
      password : new FormControl(null, [Validators.required, Validators.minLength(6)]),
      confirmPassword : new FormControl(null, [Validators.required, Validators.minLength(6)]),
      role : new FormControl(null, [Validators.required])
    }, {
      validators: CustomValidators.passwordsMatch
    })

     
  }

  onRegister() {
    if(this.registerForm.invalid) {
      return;
    }
    this.authService.register(this.registerForm.value).then((res : any) => {
      localStorage.setItem("token", res.dataUser.accessToken);
      localStorage.setItem("email", res.dataUser.email);
      localStorage.setItem("role", res.dataUser.role);
      if(res.dataUser.role === 'admin') {
        this.router.navigate(['admin']);
      }else{
        this.router.navigate(['user']);
      }
      Swal.fire('Registro exitoso', 'Bienvenido '+this.registerForm.get('email')!.value, 'success')
      })
      .catch(err => {
        Swal.fire(err.message, '', 'error')
      }
    )
  }

} 
