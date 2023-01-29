import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { IUserInfo } from 'src/app/storage/app/app.state';

@Component({
  selector: 'app-new-article-modal',
  templateUrl: './new-article-modal.component.html',
  styleUrls: ['./new-article-modal.component.scss']
})
export class NewArticleModalComponent implements OnInit{

  user: IUserInfo;
  data: any;

  constructor(
    public modal: NgbActiveModal,
  ) { }

  ngOnInit() {

    this.data = {
      email: this.user.email,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      phone: this.user.phone,
      organization: this.user.organization,
      googleAcademy: this.user.googleAcademy,
      orcid: this.user.orcid,
      userId: this.user.id,
    }
  }
}
