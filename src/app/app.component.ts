import { Component, OnInit } from '@angular/core';
import { UserOptions } from './options/userOptions';
import { TranslateService } from '@ngx-translate/core';
import { ThemeSchemeService} from 'src/app/services/theme/theme-scheme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'FightCore';

  constructor(translate: TranslateService, themeService: ThemeSchemeService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');
    themeService.load();
  }
  ngOnInit(): void {}
}
