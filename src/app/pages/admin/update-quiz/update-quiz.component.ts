import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent{
  constructor(private _route:ActivatedRoute,
     private _quiz:QuizService,
    private _cat:CategoryService,
    private _router:Router){}

qId= 0;
quiz:any;
categories:any;

ngOnInit():void{

this.qId= this._route.snapshot.params['qid']
// alert(this.qId)
this._quiz.getQuiz(this.qId).subscribe((data:any)=>{
  this.quiz=data;
  console.log(this.quiz);
  
})

this._cat.categories().subscribe((data:any)=>{
  this.categories= data;
},
(error)=>{
  alert("error in loaging categories")
}
)

}

public updateData(){
 this._quiz.updateQuiz(this.quiz).subscribe((data:any)=>{
  Swal.fire('Success','quiz updated','success').then((e)=>{
    this._router.navigate(['/admin/quizzes'])
  });
 },
 (error)=>{
  Swal.fire('error','error in updating','error');
 }
 )
}
}
