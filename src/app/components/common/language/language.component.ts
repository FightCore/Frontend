import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss'],
})
export class LanguageComponent implements OnInit {
  constructor(private translateService: TranslateService) {}
  private readonly storageKey = 'lang';
  selectedLanguage: any;
  languages = [
    {
      value: 'en',
      name: 'English',
      flag: 'us',
    },
    {
      value: 'nl',
      name: 'Nederlands',
      flag: 'nl',
    },
  ];

  ngOnInit(): void {
    let language = localStorage.getItem(this.storageKey);
    if (language == null) {
      language = 'en';
    }

    this.selectedLanguage = language;
    this.translateService.use(language);
  }

  onLanguageChange(value: string): void {
    localStorage.setItem(this.storageKey, value);
    this.translateService.use(value);
  }
}
