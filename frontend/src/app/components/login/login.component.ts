import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() error: string | null;
  loginForm : FormGroup; 
  hide : boolean = true;

  constructor(
    private authService : AuthenticationService,
    private formBuilder: FormBuilder,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email : new FormControl(null, [Validators.required, Validators.email]),
      password : new FormControl(null, [Validators.required])
    })
  }

  onLogin() {
    if(this.loginForm.invalid) {
      return;
    }
    this.authService.register(this.loginForm.value).then(rs => {
      Swal.fire('Bienvenido '+this.loginForm.get('email')!.value, '', 'success');
      localStorage.setItem("email", this.loginForm.get('email')!.value);
      localStorage.setItem("status", 'connect');
      console.log(typeof(this.loginForm.get('email')))
      this.router.navigate(['']);
      })
      .catch(err => {
        console.log(err);
        this.error = err.error.mensaje;
        Swal.fire('Email o contraseña incorrectos', '', 'error')
      }
    )
  }

}
