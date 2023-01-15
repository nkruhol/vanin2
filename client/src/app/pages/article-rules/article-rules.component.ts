import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs/operators';
import { selectLanguage, selectSiteOptions } from 'src/app/storage/app/app.selectors';
import { LanguageEnum } from 'src/app/storage/app/app.state';
import { IStore } from 'src/app/storage/store';

@Component({
  selector: 'app-article-rules',
  templateUrl: './article-rules.component.html',
  styleUrls: ['./article-rules.component.scss']
})
export class ArticleRulesComponent {

  language$ = this.store.select(selectLanguage);
  page$ = this.store.select(selectSiteOptions)
    .pipe(
      filter(i => !!i),
      filter(i => !!i.pages),
      map(i => i.pages.rules),
    );

  constructor(
    private store: Store<IStore>,
  ) { }

  LanguageEnum = LanguageEnum;
}
