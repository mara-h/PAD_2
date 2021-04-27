import { Injectable } from '@angular/core';
import { User } from '../../model/user/user.model';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

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
  getUsername() {
    const payload = this.getUserPayload();
    return payload.username;
  }
  getID() {
    const payload = this.getUserPayload();
    return payload.id;
  }
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
    if (token) {
      var payload = atob(token.split('.')[1]);
      return JSON.parse(payload);
    }
    return null;
  }
  isLoggedIn() {
    var payload = this.getUserPayload();
    if (payload) {
      return payload.exp > Date.now() / 1000;
    }
    return false;
  }
  getAllUsers() {
    return this.http.get(environment.apiBaseUrl + '/user');
  }
  getUserProfile() {
    const id = this.getID();
    return this.http.get(environment.apiBaseUrl + '/user/' + id);
  }
  getUserProfileById(id: string) {
    return this.http.get(environment.apiBaseUrl + '/user/' + id);
  }

}
