import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-article-base',
  templateUrl: './article-base.component.html',
  styleUrls: ['./article-base.component.scss']
})
export class ArticleBaseComponent implements OnInit {
  @Input() dedicated: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
