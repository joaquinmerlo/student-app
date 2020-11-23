import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service.ts.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isRegister = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      name: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6), Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }
    if (this.isRegister && !this.loginForm.value.name) {
      return;
    }
    if (this.isRegister) {
      this.authService.singUp(this.loginForm.value);
    } else {
      this.authService.singIn(this.loginForm.value);
    }
  }

  changeAction(bool: boolean) {
    this.isRegister = bool;
  }
}
