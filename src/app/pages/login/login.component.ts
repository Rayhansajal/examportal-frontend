import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  loginData={
    username : '',
    password : '',
  };
constructor(private snack:MatSnackBar , private login:LoginService, private router:Router){}
  formSubmit() {

    console.log("login button clicked");
    if(this.loginData.username.trim()=='' || this.loginData.username==null){

      this.snack.open("username is required",'',{
        duration:3000,
      });
      return;
    }
    
  
  if(this.loginData.password.trim()=='' || this.loginData.password==null){

    this.snack.open("password is required",'',{
      duration:3000,
    });
    return;
  }
  // request to server to generat token
  this.login.generateToken(this.loginData).subscribe(
    (data:any) => {
      Swal.fire('Success','login successful','success')
      
      // console.log("success");
      // console.log(data);
      
      // login
      this.login.loginUser(data.token);
      
      this.login.getCurrentUser().subscribe(
        (user:any)=>{
          this.login.setUser(user);
          console.log(user);

          // redirect admin dashboard

          // redirect normal dashboard
          if(this.login.getUserRole() == 'ADMIN'){
             
            // window.location.href='/admin';

            this.router.navigate(['admin']);
            this.login.loginStatusSubject.next(true);

          }else if(this.login.getUserRole() =='NORMAL'){
            // window.location.href='/user-dashboard';

            this.router.navigate(['user-dashboard/0']);
            this.login.loginStatusSubject.next(true);

          } else {

           this.login.logout();
          
          }
          

        }
      );
    },
    (error)=>{
      // console.log("error");
      // console.log(error);
      Swal.fire('Error','password or username incorrect','error')
      
    }
  )
  
}



}
