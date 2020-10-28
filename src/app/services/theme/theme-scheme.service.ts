import {Injectable, Renderer2, RendererFactory2} from '@angular/core';
import { UserOptions } from 'src/app/options/userOptions';

@Injectable({
    providedIn: 'root'
})
export class ThemeSchemeService {

    private renderer: Renderer2;
    private darkTheme = 'dark-theme';

    constructor(rendererFactory: RendererFactory2) {
        // Create new renderer from renderFactory, to make it possible to use renderer2 in a service
        this.renderer = rendererFactory.createRenderer(null, null);
    }

    load() {
        if (UserOptions.getDarkMode()) {
            this.renderer.addClass(document.body, this.darkTheme);
        }
    }

    toggle() {
        UserOptions.toggleDarkMode();

        if (UserOptions.getDarkMode()) {
            this.renderer.addClass(document.body, this.darkTheme);
        } else {
            this.renderer.removeClass(document.body, this.darkTheme);
        }
    }
}
