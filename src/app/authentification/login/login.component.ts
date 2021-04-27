import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { AuthentifService} from '../../shared/service/authentif/authentif.service';
import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http'
import { ignoreElements } from 'rxjs/operators';
//import { Response } from '@angular/common/http';


const token = 'token';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  serverErrorMessages='  ';
  model = {
    username: '',
    password: '',
  };

  

  constructor(private router: Router, private authentifService: AuthentifService) {}

  ngOnInit(): void {
    if (this.authentifService.isLoggedIn()) this.router.navigateByUrl('/');
    console.log('initializare ceva ')
  }
 

  onSubmit(f: NgForm) {
    this.authentifService.login(f.value).subscribe(
      (res) => {
        if(res.hasOwnProperty('token')){
          console.log(res.hasOwnProperty('token'));
         //@ts-ignore 
         console.log(res['token']);
        }
        //const token ='';
         //@ts-ignore 
        this.authentifService.setToken(res['token']);
        window.location.reload();
        this.router.navigateByUrl('/');
      },
      (err) => {
        console.log(err);
        this.serverErrorMessages = 'Incorrect username or password!';
      }
    );
    //console.log('buton login apasat');
  }
}
