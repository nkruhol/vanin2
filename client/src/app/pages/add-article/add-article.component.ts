import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { GetParticipantsByEmail } from "src/app/storage/add-article/add-article.actions";
import { selectParticipants, selectState } from "src/app/storage/add-article/add-article.selectors";
import { State } from "src/app/storage/add-article/add-article.state";
import { IStore } from "src/app/storage/store";

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent {

  state$ = this.store.select(selectState);
  participants$ = this.store.select(selectParticipants);

  constructor(
    private fb: FormBuilder,
    private store: Store<IStore>,
    private http: HttpClient,
  ) { }

  State = State;

  isLoading;

  checkForm = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
  });

  documentForm = this.fb.group({
    articleId: [null],
  });

  checkEmail() {

    this.store.dispatch(GetParticipantsByEmail({ email: this.checkForm.value.email }))
  }

  fileChanged(e) {
    console.log(e.target.files);

    const file = e.target.files[0];

    var reader = new FileReader();

    const formData = new FormData();
    formData.append("file", file);

    this.http.post(".netlify/functions/save-file", formData)
      .subscribe(res => console.log(res));


    // reader.onload = (e) => {
    //   const arrayBuffer = reader.result;

    //   console.log(777, arrayBuffer);

    //   const formData = new FormData();
    //   formData.append("file", arrayBuffer as any);

    //   this.http.post(".netlify/functions/participants", )
    // }

    reader.readAsArrayBuffer(file);
  }
}
