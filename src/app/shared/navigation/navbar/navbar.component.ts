import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentifService } from '../../service/authentif/authentif.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})


export class NavbarComponent implements OnInit {
  isLoggedIn: any;
  username: any;
  id: any;
  isAdmin: any;

  constructor(private router: Router, private authentifService: AuthentifService) { }


  ngOnInit(): void {
    this.isAdmin = this.authentifService.isAdmin();
    console.log(this.isAdmin);
    this.isLoggedIn = this.authentifService.isLoggedIn();// is logged in = true 
    if (this.isLoggedIn) {
      //this.id = this.authentifService.getID();
        this.username = this.authentifService.getUsername();
        console.log(
          'Logged: ' +
            this.isLoggedIn +
            '\nUsername: ' +
            this.username 
        );
    }
  }

  onLogout()
  {
    this.authentifService.deleteToken();
    this.authentifService.deleteInfo();
    window.location.reload();
    console.log("Logout button was pressed");
  }
}

