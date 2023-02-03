import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent {
  qId:any;
  qTitle:any;
  questions=[
    {
      quesId:'',
      content:'',
      option1:'',
      option2:'',
      option3:'',
      option4:'',
      answer:'',

    }
   
  ];

  constructor(private _route:ActivatedRoute,private _questions:QuestionService){}

  ngOnInit():void{

    this.qId=this._route.snapshot.params['qid']
    this.qTitle= this._route.snapshot.params['title']
    this._questions.getQuestionsOfQuiz(this.qId).subscribe((data:any)=>{
      console.log(data);
      this.questions= data;
      
      

    },(error)=>{
      console.log(error);
      
    });
    
    

  }
  // delete question
  deleteQuestion(qid:any){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._questions.deleteQuestion(qid).subscribe((data:any)=>{
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          this.questions = this.questions.filter((q)=>q.quesId != qid)
        },
        (error)=>{
          Swal.fire('Error','error in deleting data','error')
        }
        )
      }
    })
  }

}
