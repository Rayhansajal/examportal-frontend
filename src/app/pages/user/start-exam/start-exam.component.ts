import { LocationStrategy } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-start-exam',
  templateUrl: './start-exam.component.html',
  styleUrls: ['./start-exam.component.css']
})
export class StartExamComponent {

qid:any;
questions:any;

marksGot=0
correctAnswers=0
attempted=0

isSubmit=false;
timer:any;

  constructor(private locationSt:LocationStrategy,private _route:ActivatedRoute,
    private _question:QuestionService){}

  ngOnInit():void{

    this.preventBackButton();
   this.qid= this._route.snapshot.params['qid'];
   console.log(this.qid);
   this.loadQuestion();
   

  }
  loadQuestion() {
   this._question.getQuestionsOfQuizForTest(this.qid).subscribe((data:any)=>{
   this.questions=data;

   this.timer=this.questions.length * 1 * 60

   this.questions.forEach((q:any) => {
    q['givenAnswer']='';
    
   });
    console.log(this.questions);
    this.startTimer();
    

   },(error)=>{
    console.log(error);
    
   })
  }

  preventBackButton(){
    history.pushState(null,location.href);
    this.locationSt.onPopState(()=>{
      history.pushState(null,location.href);
    })

  }

  submitQuiz(){
    Swal.fire({
      title: 'You want to Submit?',
     
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes,Submit!'
      
    }).then((e) => {
      if (e.isConfirmed) {
       
        this.evalQuiz();
        
      }
      
    })

  }
  startTimer(){
  let t:any= window.setInterval(()=>{
      if(this.timer<=0){
        this.evalQuiz();
        clearInterval(t);
      }else {
        this.timer--
      }
    },1000)
  }

  getFormattedTimer(){
    let mm=Math.floor(this.timer/60)
    let ss= this.timer-mm*60
    return `${mm} min: ${ss} sec`
  }

  evalQuiz(){
    this.isSubmit=true;
    this.questions.forEach((q:any)=>{
      if(q.givenAnswer==q.answer){
        this.correctAnswers++

       let marSingle= this.questions[0].quiz.maxMarks/this.questions.length
       this.marksGot += marSingle
      }
      if(q.givenAnswer.trim()!=''){
        this.attempted++
      }
     
      
    })
    console.log("correct:"+this.correctAnswers);
    console.log(this.marksGot);
    
 
  }
  printPage(){
    window.print();
  }
}
