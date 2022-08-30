import { Injectable } from '@angular/core';
import { SocialMedia } from 'src/app/models/SocialMedia';
import { FetchService } from '../FetchService';

@Injectable({
  providedIn: 'root'
})
export class SocialMediaService extends FetchService<SocialMedia> {
  uri = "https://shielded-wildwood-94592.herokuapp.com";
  ednpoint = "/social-media/";
}
