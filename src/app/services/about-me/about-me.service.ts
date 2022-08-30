import { Injectable } from '@angular/core';
import { AboutMe } from 'src/app/models/AboutMe';
import { FetchService } from '../FetchService';

@Injectable({
  providedIn: 'root'
})
export class AboutMeService extends FetchService<AboutMe> {
  uri = "https://shielded-wildwood-94592.herokuapp.com";
  ednpoint = "/about-me/";
}
