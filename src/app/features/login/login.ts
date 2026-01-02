import { HttpClient } from '@angular/common/http';
import { Component, inject, InjectDecorator } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  loginObj: any = {
    email: '',
    password: ''
  };

  http = inject(HttpClient);
  router = inject(Router);

  onLogin() {
    // debugger
    console.log(this.loginObj);
    this.http.post("https://feestracking.freeprojectapi.com/api/BatchUser/login", this.loginObj).subscribe({
      next: (res: any) => {
        console.log(res);
        localStorage.setItem('batchUser',JSON.stringify(res.data));
        this.router.navigateByUrl('dashboard');
      },
      error: (err: any) => {
        // debugger
        console.log(err.error.message);
        alert(err.error.message);
        //  Swal.fire({
        //                                 text: "Something went wrong! Try again. Please try again.",
        //                                 icon: "warning",
        //                                 confirmButtonText: "Ok"
        //                         });
      }
    });
  }
}
