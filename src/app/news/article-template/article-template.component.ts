import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-article-template',
  templateUrl: './article-template.component.html',
  styleUrls: ['./article-template.component.scss']
})
export class ArticleTemplateComponent implements OnInit {
  @Input() title: string;
  @Input() subtitle: string;
  @Input() id: string;
  @Input() hashtags: string;
  @Input() dedicated: boolean = false;

  currentUrl = window.location.href;

  constructor(private translate: TranslateService) { }

  ngOnInit() {
    this.translate.get('NEWS.ARTICLE_BUTTONS.MORE').subscribe(res => {
      this.moreButtonText = res;
    });
    this.translate.get('NEWS.ARTICLE_BUTTONS.LESS').subscribe(res => {
      this.lessButtonText = res;
    });
  }

  moreKey = 'NEWS.ARTICLE_BUTTONS.MORE';
  lessKey = 'NEWS.ARTICLE_BUTTONS.LESS';
  currentKey = this.moreKey;

  moreButtonText = "";
  lessButtonText = "";

  toggleCollapseArticle() {
    let article = document.getElementById("article-content-" + this.id);
    let button = document.getElementById("button-" + this.id);

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
