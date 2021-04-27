import { Component, OnInit } from '@angular/core';
import { AuthentifService} from '../../shared/service/authentif/authentif.service'
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  showSuccessMessage!: boolean ;
  serverErrorMessages!: string;

  constructor(private authentifService: AuthentifService, private router: Router) { }

  ngOnInit(): void {
    if (this.authentifService.isLoggedIn()) this.router.navigateByUrl('/');
  }

  onSubmit(f: NgForm) {
    this.authentifService.postUser(f.value).subscribe(
      (res) => {
        this.showSuccessMessage = true;
        f.resetForm();
        this.serverErrorMessages = '';
      },
      (err) => {
        this.serverErrorMessages = 'Email not valid or user already exists!';
      }
    );
  }
}
