import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/app/services/common/common.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  token: string;
  email: string;
  role: string;

  messageReceived: any;
  private subscriptionName: Subscription; 

  constructor(private router : Router, private commonService : CommonService) {
    this.subscriptionName= this.commonService.getUpdate().subscribe
             (message => { 
             this.messageReceived = message.text;
             console.log(this.messageReceived)
             if(this.messageReceived === 'Logged') {
               this.ngOnInit();
             }
             });
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('token') || '';
    this.role = localStorage.getItem('role') || '';
    this.email =  localStorage.getItem('email') || '';
  }

  logout() {
    localStorage.removeItem("token"); 
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    this.token = '';
    this.router.navigate(['']);
  }

}
