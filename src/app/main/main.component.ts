import { NewsService } from './../news.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NewsOutlet } from '../news.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {
  categ = '';
  sources: NewsOutlet[] = [];
  categories: string[] = [];
  outletSub: Subscription;
  p: number = 1;
  count: number = 6;
  query: string = '';

  constructor(private newsService: NewsService) {
  }

  ngOnInit() {
    this.outletSub = this.newsService.sources.subscribe(outlets => {
      this.sources = outlets;
      for (const source of this.sources) {
        if (!this.categories.includes(source.category)) {
          this.categories.push(source.category);
        }
      }
    });
    this.newsService.loadOutlets();
  }

  ngOnDestroy(): void {
    this.outletSub.unsubscribe();
  }




}
