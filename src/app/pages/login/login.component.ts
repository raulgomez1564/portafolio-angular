import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loginError: string = "";

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      user: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    if (this.authService.Login.valueOf()) {
      this.router.navigate([""]);
    }
  }

  get Password() {
    return this.form.get("password");
  }

  get User() {
    return this.form.get("user");
  }

  onEnviar(event: Event) {
    event.preventDefault;

    if (this.form.valid) {
      this.authService.login(this.User?.value, this.Password?.value)
    }
    this.form.markAllAsTouched();
  }
}