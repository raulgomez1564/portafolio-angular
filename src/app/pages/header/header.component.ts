import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SocialMedia } from 'src/app/models/SocialMedia';
import { SocialMediaService } from 'src/app/services/social-media/social-media.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  defaultImageSrc: string = ""
  imageSrc: string = this.defaultImageSrc
  imageEdited: boolean = false;

  defaultFacebook: string = ""
  defaultInstagram: string = ""
  formEdited: boolean = false;
  form: FormGroup;

  constructor(public authService: AuthService, private router: Router, private formBuilder: FormBuilder, public socialMediaService: SocialMediaService) {
    this.form = this.formBuilder.group({
      facebook: [this.defaultFacebook, [Validators.required]],
      instagram: [this.defaultInstagram, [Validators.required]],
    })
  }

  async ngOnInit(): Promise<void> {
    let socialMedias: [SocialMedia] | null = await this.socialMediaService.get()

    if (socialMedias) {
      for (const socialMedia of socialMedias) {
        if (socialMedia.name == "facebook") {
          this.defaultFacebook = socialMedia.url
        }
        if (socialMedia.name == "instagram") {
          this.defaultInstagram = socialMedia.url
        }
        this.form.setValue({
          "facebook": this.defaultFacebook,
          "instagram": this.defaultInstagram,
        })
      }
    }

    let imageResponse:null|string =  await this.socialMediaService.getImage()
    if (imageResponse) {
      this.defaultImageSrc = imageResponse
      this.imageSrc = imageResponse
    }
  }

  toLogin(): void {
    this.router.navigate(["/login"]);
  }


  async formSend() {
    let putFacebookResult = await this.socialMediaService.put({
      name: "facebook",
      url: this.form.get("facebook")?.value
    }, "facebook")

    let putInstagramResult = await this.socialMediaService.put({
      name: "instagram",
      url: this.form.get("instagram")?.value
    }, "instagram")

    if (putFacebookResult && putInstagramResult) {
      this.defaultFacebook = this.form.get("facebook")?.value
      this.defaultInstagram = this.form.get("instagram")?.value
      this.formEdited = false
    }
  }

  editForm() {
    this.formEdited = true;
  }

  cancelForm() {
    this.formEdited = false;
  }

  imgInputChange(fileInputEvent: any) {
    if (fileInputEvent.target.files && fileInputEvent.target.files[0]) {
      const file = fileInputEvent.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        if (reader.result && typeof reader.result === "string") {
          this.imageSrc = reader.result
          this.imageEdited = true;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  cancelEdition() {
    this.imageSrc = this.defaultImageSrc
    this.imageEdited = false;
  }

  async savelEdition() {
    let success: boolean = await this.socialMediaService.createImage({ content: this.imageSrc })

    if (success) {
      this.defaultImageSrc = this.imageSrc
      this.imageEdited = false;
    }
  }
}
