import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-article-base',
  template: '',
  styleUrls: ['./article-base.component.scss']
})
export class ArticleBaseComponent {
  @Input() dedicated: boolean = true;
  route: string;
  id: string;
  titleKey: string;

  constructor(inputRoute: string, inputId: string, inputTitleKey: string) {
    this.route = inputRoute;
    this.id = inputId;
    this.titleKey = inputTitleKey;
  }
}
