import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private roles: string[];
  isLoggedIn = false;
  isAdmin = false;
  username: string;

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.isAdmin = this.roles.includes('ROLE_ADMIN');
      this.username = user.username;
    }

    $(function() {
      $(window).on('scroll', function() {
        if ($(window).scrollTop() >= 30) {
          $('#mainNav').addClass('navbar-shrink');
        } else {
          $('#mainNav').removeClass('navbar-shrink');
        }
      });
    });
  }

  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

}
