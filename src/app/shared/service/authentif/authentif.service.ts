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
  getToken() {
    return localStorage.getItem('token');
  }
  
  deleteToken() {
    localStorage.removeItem('token');
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
  
 
    //const token = this.getToken();
    //const token = JSON.parse(localStorage.getItem('token') || '{}');
    //console.log('is token expired:');
   // console.log(helper.isTokenExpired(token));
    //return this.jwtHelper.isTokenExpired()
    //return isTokenExpired() ;
    //return true;

  }
  getAllUsers() {
    return this.http.get(environment.apiBaseUrl + '/user');
  }
  
  getUserProfileById(id: string) {
    return this.http.get(environment.apiBaseUrl + '/user/' + id);
  }

}
