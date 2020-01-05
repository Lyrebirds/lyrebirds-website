import { Component, OnInit } from '@angular/core';
import { ARTICLES } from '../articles';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  articles = ARTICLES;

  constructor() { }

  ngOnInit() {
  }

  uncollapseArticle(articleId, buttonId){
    let article = document.getElementById(articleId);
    let button = document.getElementById(buttonId);
    article.style.overflow = "hidden";
    article.style.background = "white";
    article.animate({ maxHeight: "none"});
    button.innerText = " Less"
  }
}
