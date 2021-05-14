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
        this.serverErrorMessages = '';
        this.showSuccessMessage = false;
        if(res.hasOwnProperty('msg')){ 
          //@ts-ignore
         console.log(" error mesage:" + res['msg']);
         //@ts-ignore
         this.serverErrorMessages = res['msg'];
       }

       //@ts-ignore
       if(res.hasOwnProperty('success') && res['success'] === true){
          //@ts-ignore
          console.log(" error mesage:" + res['success']);
        this.showSuccessMessage = true;
        f.resetForm();
        this.serverErrorMessages = '';
       }
        
      },
      (err) => {
        this.serverErrorMessages = 'Email not valid or user already exists!';
      }
    );
  }
}
