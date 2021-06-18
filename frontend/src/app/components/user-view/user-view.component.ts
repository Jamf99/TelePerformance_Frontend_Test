import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

  constructor(private userService : UserService) { }
  userData = {
    token: localStorage.getItem("token") || '',
    role : localStorage.getItem("role") || ''
  }

  dogs : string[] = [];

  ngOnInit(): void {   
    this.userService.getDogs(this.userData).then((res : any) => {
      res.forEach((dog : any) => {
        this.dogs.push(dog.name);
      });
    })
  }

}
