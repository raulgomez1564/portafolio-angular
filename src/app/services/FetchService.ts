import { Injectable } from '@angular/core';
import {AxiosError} from 'axios';
import axios from 'axios';
import { Image } from '../models/Image';
import { ErrorComponent } from '../pages/modal/error/error.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export abstract class FetchService<T> {
  public abstract uri:string;
  public abstract ednpoint:string;

  constructor(public dialog: MatDialog) {}

  handleError(data: {
    err:any,
    url:string,
    body:T | null
    method:string
  }) {
    let messageError = "Communication error with the server";
    if(data.err instanceof AxiosError && data.err.response && data.err.response.data){
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
      },
    });
  }

  public async getImage(): Promise<null | string> {
    let result: null | string = null;
    let url = this.uri + this.ednpoint + "image"

    try {
      result = (await axios.get<string>(url)).data;
    } catch (err) {
      this.handleError({
        url: url,
        err: err,
        body : null,
        method: "get"
      })
    }
    return result;
  }

  public async createImage(image:Image): Promise<boolean> {
    let url = this.uri + this.ednpoint + "image"

    try {
      await axios.post<string>(url,image,{
        headers: {
          "Authorization": "Bearer "+ localStorage.getItem("auth_token")
        }
      });
      return true;
    } catch (err) {
      this.handleError({
        url: url,
        err: err,
        body : null,
        method: "post"
      })
      return false;
    }
  }

  public async get(): Promise<null | [T]> {
    let result: null | [T] = null;
    let url = this.uri + this.ednpoint

    try {
      result = (await axios.get<[T]>(url)).data;
    } catch (err) {
      this.handleError({
        url: url,
        err: err,
        body : null,
        method: "get"
      })
    }
    return result;
  }

  async put<K>(body: T, key: K): Promise<boolean> {
    let url = this.uri + this.ednpoint  + key

    try {
      await axios.put(url, body,{
        headers:{
          "Authorization": "Bearer "+ localStorage.getItem("auth_token")
        }
      });
      return true
    } catch (err) {
      this.handleError({
        url: url,
        err: err,
        body : body,
        method: "put"
      })
      return false
    }
  }

  async post(body: T): Promise<boolean> {
    let url = this.uri + this.ednpoint

    try {
      await axios.post(url, body,{
        headers: {
          "Authorization": "Bearer "+ localStorage.getItem("auth_token")
        }
      });
      return true
    } catch (err) {
      this.handleError({
        url: url,
        err: err,
        body : body,
        method: "post"
      })
      return false
    }
  }

  async delete <K>(key: K): Promise<boolean> {
    let url = this.uri + this.ednpoint  + key

    try {
      await axios.delete(url,{
        headers: {
          "Authorization": "Bearer "+ localStorage.getItem("auth_token")
        }
      });
      return true
    } catch (err) {
      this.handleError({
        url: url,
        err: err,
        body : null,
        method: "delete"
      })
      return false
    }
  }
}
