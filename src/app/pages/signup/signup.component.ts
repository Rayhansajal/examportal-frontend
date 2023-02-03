import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent{
  constructor(
    private userService:UserService,private _snack: MatSnackBar 
  ) { }

  public user = {
    username:'',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',

  };

  formSubmit(){

   console.log(this.user);
   if(this.user.username=='' || this.user.username==null)
   {
    this._snack.open("User Name is required",'',{
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right',

    });
    return;
   }

   // add user userservice
   this.userService.addUser(this.user).subscribe(
    (data:any) =>{

      console.log(data);
     Swal.fire('Successfully Done','User id is: '+data.id,'success');

    },
    (error:any) =>{

      console.log(error);
      this._snack.open("Something Went Wrong !!",'',{
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'right',
  
      });
    }
    );


  }
}
