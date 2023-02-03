import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchAll } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {

  category={
    title:'',
    description:'',
  };

  constructor(private _catgory:CategoryService, private _snack:MatSnackBar){}

  formsubmit(){
    if(this.category.title.trim()=='' || this.category.title==null){
      this._snack.open("Title required",'',{
        duration:3000,
      });
      return;
    }

    this._catgory.addCategory(this.category).subscribe((data:any)=>{
      this.category.title='';
      this.category.description='';
      Swal.fire("success","data successfully added","success")

    },
    (error)=>{
      console.log("error");
      Swal.fire("Error","Server Error","error")
      
    }
    
    );
  }
}
