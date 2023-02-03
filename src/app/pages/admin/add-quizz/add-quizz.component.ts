import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-add-quizz',
  templateUrl: './add-quizz.component.html',
  styleUrls: ['./add-quizz.component.css']
})
export class AddQuizzComponent {

  categories=[
    {
      cid:'',
      title:'',
    }
  ];
  quizData={
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestion:'',
    active:'true',
    category:{
      cid:'',
    },

  };

  constructor(private _cat:CategoryService ,private _snack:MatSnackBar,private _quiz:QuizService){}

  ngOnInit(): void{
    this._cat.categories().subscribe((data:any)=>{
      // load category
      this.categories=data;
      console.log(this.categories);
      
    },
    (error)=>{
      console.log(error);
      Swal.fire('error','error in loading data','error')
      
    }
    );
  }
  addQuiz(){
    if(this.quizData.title.trim()=='' || this.quizData.title==null){
this._snack.open('title required','',{
  duration:3000,
});
return;
    }
    
this._quiz.addQuiz(this.quizData).subscribe((data)=>{
  Swal.fire('Success','success','success');
  this.quizData={
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestion:'',
    active:'false',
    category: {
      cid:'',
    },

  };
},
(error)=>{
  console.log('error');
  
  Swal.fire('error','error in loadig data','error');
}
)
   
   
}
}