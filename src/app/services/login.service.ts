import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject=new Subject<boolean>();

  constructor(private http:HttpClient) { }


// current user : which is logged in
  public getCurrentUser(){
    return this.http.get(`${baseUrl}/current-user`);
  }

  // Generate Token
  public generateToken(loginData:any){

    return this.http.post(`${baseUrl}/generate-token`,loginData);
  }

  // login User: set token in local storage

  public loginUser(token:any){
     localStorage.setItem('token',token);
   
     return true;
  }
  // islogin: user is logged in or not
  public isLoggedIn(){
    let tokenStr= localStorage.getItem("token")
    if(tokenStr== undefined || tokenStr=='' || tokenStr==null){
      return false;
    }else{
      return true;
    }

  }

  // logged out: remove token from local storage
  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  // get Token
  public getToken(){
    return localStorage.getItem('token');
  }

  // user Detail
  public setUser(user:any){
    localStorage.setItem("user",JSON.stringify(user));

  }
  // get user
  public getUser(){
    let userStr= localStorage.getItem("user")
    if(userStr !=null){
      return JSON.parse(userStr);
    }else{
      this.logout();
      return null;
    }
  }

  // get user Role
  public getUserRole(){
    let user= this.getUser()

    return user.authorities[0].authority; 
    
  }
}
