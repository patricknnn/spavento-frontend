import { Router } from '@angular/router';
import {Component, OnInit} from '@angular/core';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  private roles: string[];
  isLoggedIn = false;
  isAdmin = false;

  constructor(private tokenStorageService: TokenStorageService, private router: Router) { }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.isAdmin = this.roles.includes('ROLE_ADMIN');
    }
    if (!this.isLoggedIn || !this.isAdmin) {
      this.router.navigate(['/login']);
    }
  }
}
