import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AxiosError } from 'axios';
import axios from 'axios';
import { Loggin } from 'src/app/models/Loggin';
import { ErrorComponent } from 'src/app/pages/modal/error/error.component';
import { UnauthorizedComponent } from 'src/app/pages/modal/unauthorized/unauthorized.component';
import { FetchService } from '../FetchService';

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  uri = "https://shielded-wildwood-94592.herokuapp.com";
  ednpoint = "/auth/";

  constructor(private router: Router, public dialog: MatDialog) {
  }

  async login(user: string, password: string) {
    let url = this.uri + this.ednpoint + "login"

    try {
      let response = await axios.post(url, {
        nombreUsuario: user,
        password: password
      });
      localStorage.setItem("auth_token", response.data.token)
      this.router.navigate([""]);
    } catch (err) {
      this.handleError({ url: url, err: err, body: null, method: "post" })
    }
  }

  logout() {
    localStorage.removeItem("auth_token")
  }

  get Login() {
    return (localStorage.getItem("auth_token") !== null)
  }

  handleError(data: {
    err: any,
    url: string,
    body: Loggin | null
    method: string
  }) {
    if (data.err instanceof AxiosError && data.err.response && data.err.response.status == 401) {
      this.dialog.open(UnauthorizedComponent);
      return;
    }

    let messageError = "Communication error with the server";
    if (data.err instanceof AxiosError && data.err.response && data.err.response.data) {
      messageError = data.err.response.data;
    }
    this.dialog.open(ErrorComponent, {
      height: '80%',
      width: '80%',
      data: {
        errorMessage: JSON.stringify(messageError),
        url: data.url,
        body: JSON.stringify(data.body),
        method: data.method
      }
    });
  }
}
