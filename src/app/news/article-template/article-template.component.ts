import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-article-template',
  templateUrl: './article-template.component.html',
  styleUrls: ['./article-template.component.scss']
})
export class ArticleTemplateComponent {
  @Input() title: string;
  @Input() subtitle: string;
  @Input() route: string;
  @Input() hashtags: string;
  @Input() dedicated: boolean;
  @Input() id: string;

  currentUrl = window.location.href;

  constructor() { }

  moreKey = 'NEWS.ARTICLE_BUTTONS.MORE';
  lessKey = 'NEWS.ARTICLE_BUTTONS.LESS';
  currentKey = this.moreKey;

  toggleCollapseArticle() {
    let article = document.getElementById("article-content-" + this.route);
    if (this.currentKey === this.moreKey) {
      article.classList.remove("article-mask")
      this.updateHeight(article, article.scrollHeight);
      this.currentKey = this.lessKey;
    } else {
      article.classList.add("article-mask");
      this.updateHeight(article, 400);
      this.currentKey = this.moreKey;
    }
  }

  updateHeight(el, inputHeight, delay = 0) {
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
