import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import Swal from 'sweetalert2';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm : FormGroup; 
  hide : boolean = true;
  constructor(
    private authService : AuthenticationService,
    private formBuilder: FormBuilder,
    private router : Router,
    private commonService : CommonService
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
    this.authService.login(this.loginForm.value).then((res : any) => {
      localStorage.setItem("token", res.dataUser.accessToken);
      localStorage.setItem("email", res.dataUser.email);
      localStorage.setItem("role", res.dataUser.role);
      if(res.dataUser.role === 'admin') {
        this.router.navigate(['admin']);
      }else{
        this.router.navigate(['user']);
      }
      this.commonService.sendUpdate('Logged');
      Swal.fire('Registro exitoso', 'Bienvenido '+this.loginForm.get("email")!.value, 'success')
      })
      .catch(err => {
        Swal.fire('Email o contraseña incorrectos', '', 'error')
      }
    )
  }

}
