import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VirtualTimeScheduler } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service.ts.service';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss'],
})
export class ToolBarComponent implements OnInit {
  loggedIn = false;

  constructor(private authService: AuthService, private router: Router) {
    this.loggedIn = !!localStorage.getItem('token');
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  singOut(): void {
    this.authService.singOut();
    this.router.navigate(['login']);
  }

  ngOnInit(): void {}
}
