import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { AuthentifService} from '../../shared/service/authentif/authentif.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  serverErrorMessages!: string;
  

  constructor(private router: Router, private authentifService: AuthentifService) {}

  ngOnInit(): void {
    if (this.authentifService.isLoggedIn()) this.router.navigateByUrl('/');
  }

  onSubmit(f: NgForm) {
    this.authentifService.login(f.value).subscribe(
      (res) => {
        this.authentifService.setToken("");
        window.location.reload();
        this.router.navigateByUrl('/');
      },
      (err) => {
        this.serverErrorMessages = 'Incorrect username or password!';
      }
    );
  }
}
