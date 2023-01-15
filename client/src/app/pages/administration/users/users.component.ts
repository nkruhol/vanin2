import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { InitAdministrationAction, UpdateSiteViewOptionsAction } from 'src/app/storage/administration/administration.actions';
import { selectLayout, selectState } from 'src/app/storage/administration/administration.selectors';
import { IPages } from 'src/app/storage/administration/administration.state';
import { IStore } from "src/app/storage/store";

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  // @Input() pages: IPages;
  @Output() init = new EventEmitter();
  // @Output() update = new EventEmitter<IPages>();

  // pagesArr: string[] = [];
  // pageLanguagesArr: string[] = [];
  // currentPage: string = '';
  // currentLanguage: string = '';
  // currentPageText: string = '';

  constructor(
    // private fb: FormBuilder,
  ) {}

  // editPageForm = this.fb.group({
  //   startPage: [null],
  // })

  // editorConfig = {
  //   editable: true,
  //   minHight: '400px'
  // }

  ngOnInit() {

    this.init.emit();

    // this.editPageForm.valueChanges.pipe().subscribe(i => {

    //   console.log(i.startPage);
    // })
  }

  // ngOnChanges(changes: SimpleChanges): void {
    
    

  //   if (changes.pages.currentValue) {

  //     this.pagesArr = Object.keys(changes.pages.currentValue);
  //     this.currentPage = 'start';
  //     this.onCurrentPageSelect();
  //   }
  // }

  // onCurrentPageSelect() {

  //   console.log('currentPage', this.currentPage);

  //   this.pageLanguagesArr = Object.keys(this.pages[this.currentPage]);
  //   this.currentLanguage = 'ua';
  //   this.currentPageText = this.pages[this.currentPage][this.currentLanguage];
  // }

  // onCurrentLanguageSelect() {

  //   this.currentPageText = this.pages[this.currentPage][this.currentLanguage];
  // }

  // onUpdate() {

  //   const pages: any = { ...this.pages };
  //   pages[this.currentPage] = { ...pages[this.currentPage] };
  //   pages[this.currentPage][this.currentLanguage] = this.currentPageText;

  //   this.update.emit(pages);
  // }

}
