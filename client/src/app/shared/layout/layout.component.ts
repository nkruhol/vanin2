import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs/operators';
import { selectSiteOptions } from 'src/app/storage/app/app.selectors';
import { IStore } from 'src/app/storage/store';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  siteOptions$ = this.store.select(selectSiteOptions);
  layoutOptions$ = this.siteOptions$.pipe(
    filter(i => !!i),
    map(i => i.layout),
  );

  constructor(
    private store: Store<IStore>,
  ) { }

  isCollapsed: boolean = true;

  ngOnInit(): void {
  }

}
