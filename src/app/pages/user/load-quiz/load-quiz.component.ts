import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent {
  catId:any;
  quizzes:any;
constructor(private route:ActivatedRoute, private _quiz:QuizService,){}


ngOnInit():void{

  this.route.params.subscribe((params)=>{
    console.log(params);
    this.catId = params['catId'];
    if(this.catId==0){
      console.log('load all the quiz');
      this._quiz.getActiveQuizzes().subscribe((data:any)=>{
        this.quizzes = data;
        console.log(this.quizzes);
        
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error','error in loading quiz','error')
      }
      )
    
     }
     else{
      console.log('load specific quiz');
      this._quiz.getActiveQuizzesOfCategory(this.catId).subscribe((data:any)=>{
        this.quizzes=data;
      },(error)=>{
        alert("error");
      })
     
     } 

  })
 
 
}
}
