import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {

  constructor(private adminService : AdminService) { }
  userData = {
    token: localStorage.getItem("token") || '',
    role : localStorage.getItem("role") || ''
  }

  cats : string[] = [];

  ngOnInit(): void {   
    this.adminService.getCats(this.userData).then((res : any) => {
      res.forEach((cat : any) => {
        this.cats.push(cat.name);
      });
    })
  }

}
