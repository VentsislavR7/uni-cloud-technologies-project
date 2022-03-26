import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  get email() {
    return this.loginForm.controls['email'];
  }

  get password() {
    return this.loginForm.controls['password'];
  }

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.tryAutoLogin();

    this.initForm();
  }

  onFormSubmit() {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.status === 'VALID') {
      this.authService.login(this.email.value, this.password.value).subscribe(
        (val) => {},
        (err) => {
          alert(err.error.message);
        }
      );
    }
  }

  private initForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
      rememberMe: new FormControl(false),
    });
  }
}
