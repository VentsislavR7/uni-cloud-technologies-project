import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;

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
    this.submitted = true;

    if (this.loginForm.status === 'VALID') {
      this.authService.login(this.email.value, this.password.value).then(
        (val) => {},
        (err) => {
          if (err.error.message) {
            alert(err.error.message);
          } else {
            alert('Something went wrong!');
          }
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
