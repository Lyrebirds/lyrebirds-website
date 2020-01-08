import { Component, OnInit } from '@angular/core';
import { ARTICLES } from '../articles';
import { HttpBackend } from '@angular/common/http';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  currentUrl = window.location.href;

  articles = ARTICLES;

  constructor() { }

  ngOnInit() {
  }

  toggleCollapseArticle(articleId, buttonId){
    let article = document.getElementById(articleId);
    let button = document.getElementById(buttonId);
    if(button.innerText == " More"){
      article.classList.remove("article-mask")
      this.updateHeight(article, article.scrollHeight);
      button.innerText = " Less";
    } else {
      article.classList.add("article-mask");
      this.updateHeight(article, 400);
      button.innerText = " More";
    }
  }

  updateHeight(el, inputHeight, delay = 0) {
    console.log("inputHeight: " + inputHeight)
    setTimeout(() => {

      const prevHeight = el.style.height;
      el.style.height = 'auto';
      const newHeight = inputHeight + 'px';
      el.style.height = prevHeight;

      setTimeout(() => {
        el.style.height = newHeight;
      }, 50);
    }, delay);
  }
}
