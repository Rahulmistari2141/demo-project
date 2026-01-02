import { HttpClient } from '@angular/common/http';
import { Component ,inject} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  http = inject(HttpClient);
  router = inject(Router);

  loginuserData:any;

  constructor(){
    const locatData = localStorage.getItem("batchUser");
    if (locatData != null){
      this.loginuserData = JSON.parse(locatData);
    }
  }

  onLogout(){
    localStorage.removeItem('batchUser');
    this.router.navigate(['login']);
  }
  
}
