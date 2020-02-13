import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

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

  contentId: string;

  currentUrl = window.location.href;

  constructor(private translator: TranslateService) {
    translator.get(this.route).subscribe(routeTranslation => {
      console.log("Route: " + this.route)
      console.log("Translation: " + routeTranslation);
      //this.contentId = "article-content-" + routeTranslation;
    })
  }

  moreKey = 'NEWS.ARTICLE_BUTTONS.MORE';
  lessKey = 'NEWS.ARTICLE_BUTTONS.LESS';
  currentKey = this.moreKey;

  toggleCollapseArticle() {
    console.log('Content ID: ' + this.contentId)
    let article = document.getElementById(this.contentId);
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
