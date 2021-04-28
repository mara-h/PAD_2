import { Injectable } from '@angular/core';
import { User } from '../../model/user/user.model';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
//import { JwtService } from where i made it
import { from } from 'rxjs';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthentifService {
  

  noAuthentifHeader = { headers: new HttpHeaders({ NoAuthentif: 'True' }) };
  selectedUser: User = {
    username: '',
    email: '',
    password: ''
  };

  constructor(private http: HttpClient) {}
  
  postUser(user: User) {
    return this.http.post(
      environment.apiBaseUrl + '/user/register',
      user,
      this.noAuthentifHeader
    );
  }

  
  login(authentifCredentials: any) {

    return this.http.post(
      environment.apiBaseUrl + '/user/login',
      authentifCredentials,
      this.noAuthentifHeader
      
    );
  }
  //getUsername() {
   // const payload = this.getUserPayload();
   // return payload.user.username;
  //}
 
  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  setIsAdmin(isAdmin: string){
    localStorage.setItem('isAdmin', isAdmin);
    console.log('set is admin in local storage');
    console.log(localStorage.getItem('isAdmin'));
  }
  setUsername(username: string){
    console.log("set the username");
    localStorage.setItem('username', username);
    console.log(localStorage.getItem('username'));
  }
  getToken() {
    return localStorage.getItem('token');
  }

  
  deleteToken() {
    localStorage.removeItem('token');
  }
  deleteInfo(){
    localStorage.removeItem('username');
    localStorage.removeItem('isAdmin');
  }
  deleteUser(id: string) {
    this.http.delete(environment.apiBaseUrl + '/user/' + id).subscribe();
  }
  getUserPayload() {
    var token = localStorage.getItem('token');
    console.log(token);
    console.log("get user payload mai sus");
    if (token) {
      var payload = atob(token.split('.')[1]);
      return JSON.parse(payload);
    }
    return null;
  }
  isLoggedIn() {
    var payload = this.getUserPayload();
    if (payload) {
      console.log('is token expired cu payload:');
      console.log(payload.exp);
      return payload.exp > Date.now() / 1000;
    }
    console.log('is token expired pe else:');
    console.log('false');
    return false;
  
  }


  isAdmin(){
    var isAd = localStorage.getItem('isAdmin');
    console.log("este admin:" + isAd);
    return isAd;
  }

  getAllUsers() {
    return this.http.get(environment.apiBaseUrl + '/user');
  }
  
  getUserProfileById(id: string) {
    return this.http.get(environment.apiBaseUrl + '/user/' + id);
  }

  getUsername(){
    var user = localStorage.getItem('username');
    console.log("get username:" + user);
    return user;
  }


}
