import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';

import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { SnakBarService } from './shared/snak-bar.service';

const baseURL = `${environment.apiURL}/auth/`;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: Observable<User | null> = new Observable(null);

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBarService: SnakBarService
  ) {
    this.getUserData();
  }

  singIn(params: any) {
    return this.http.post<User>(baseURL + 'authenticate', params).subscribe(
      (data) => {
        this.user = of(data);
        localStorage.setItem('token', data.token);
        this.router.navigate(['/']);
      },
      ({ error }) => {
        this.snackBarService.openSnackBar(error);
      }
    );
  }

  singUp(params: any) {
    return this.http.post<User>(baseURL + 'register', params).subscribe(
      (data) => {
        this.user = of(data as User);
        localStorage.setItem('token', data.token);
        this.router.navigate(['/']);
      },
      ({ error }) => {
        this.snackBarService.openSnackBar(error);
      }
    );
  }
  singOut() {
    this.user = null;
    localStorage.removeItem('token');
  }

  getUserData() {
    this.http.get<User>(baseURL + 'user').subscribe(
      (data) => {
        const userInfo = data as User;
        userInfo.token.replace('Bearer', '');
        return of(userInfo as User);
      },
      (error) => {
        localStorage.removeItem('token');
        return of(null);
      }
    );
  }
}
