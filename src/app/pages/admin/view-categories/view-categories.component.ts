import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchAll } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent {

  categories=[
    {
      title:'',
      description:''
    }
   ];

constructor(private _category:CategoryService, private snack: MatSnackBar){}

ngOnInit(): void{

  this._category.categories().subscribe((data:any)=>{
    this.categories=data;
    console.log(this.categories);
    
  },
  (error)=>{
    console.log(error);
    this.snack.open("password is required",'',{
      duration:3000,
    });
    
    
  });
}

}
