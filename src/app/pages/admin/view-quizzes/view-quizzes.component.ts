import { Component } from '@angular/core';
import { switchAll } from 'rxjs';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent {
  quizzes = [
    {
      qId:'',
      title:'',
      description:'',
      maxMarks:'',
      numberOfQuestion:'',
      category:{
        title:'',
      },

    },
   

   
  ];
  constructor(private _quiz:QuizService){}
ngOnInit(): void{
  this._quiz.quizzes().subscribe(
    (data:any)=>{
      this.quizzes=data;
      console.log(this.quizzes);
      
    },
    (error)=>{
      console.log(error);
      Swal.fire('error','error in loading data');
      
    }
  );
}
// delete
deleteQuiz(qId:any){
  Swal.fire({
    icon: 'warning',
    title: 'are you sure?',
    confirmButtonText: 'Delete',
    showCancelButton: true
  }).then((result)=>{
  if(result.isConfirmed){

    this._quiz.deleteQuiz(qId).subscribe(
      (data:any)=>{
    
       this.quizzes= this.quizzes.filter((quiz)=>quiz.qId !=qId);
        Swal.fire('Success','quiz deleted','success');
      },
      (error)=>{
        Swal.fire('error','error in delating quiz','error');
      }
     
    )
    
  }
 } )
}
}
