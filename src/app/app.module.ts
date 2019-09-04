import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModules } from './material-modules';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { SideNavComponent } from './layout/side-nav/side-nav.component';
import { NavBarComponent } from './layout/nav-bar/nav-bar.component';
import { PostComponent } from './pages/post/post.component';
import { ToastrModule } from 'ngx-toastr';
import { PostPreviewComponent } from './components/post-preview/post-preview.component';
import { AppRoutingModule } from './app-routing.module';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { LMarkdownEditorModule } from 'ngx-markdown-editor';
import { GameSelectorComponent } from './components/game-selector/game-selector.component';
import { FormsModule } from '@angular/forms';
import { PostHelpComponent } from './components/post-help/post-help.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
import { PostDisplayComponent } from './pages/post-display/post-display.component';
import { LikeButtonComponent } from './components/like-button/like-button.component';
import { EditPostComponent } from './pages/edit-post/edit-post.component';
import { CharacterPreviewComponent } from './components/character-preview/character-preview.component';
import { CharacterComponent } from './pages/character/character.component';
import { LoadingComponent } from './components/loading/loading.component';
import { CharacterDisplayComponent } from './pages/character-display/character-display.component';
// Import FontAwesome icons where needed.

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    NavBarComponent,
    PostComponent,
    PostPreviewComponent,
    CreatePostComponent,
    GameSelectorComponent,
    PostHelpComponent,
    LoginComponent,
    AuthCallbackComponent,
    PostDisplayComponent,
    LikeButtonComponent,
    EditPostComponent,
    CharacterPreviewComponent,
    CharacterComponent,
    LoadingComponent,
    CharacterDisplayComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModules,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    LMarkdownEditorModule,
    MarkdownModule.forRoot({
      markedOptions: {
        provide: MarkedOptions,
        useValue: {
          gfm: true,
          tables: true,
          breaks: false,
          pedantic: false,
          sanitize: false, // enable marked built-in html sanitizer
          smartLists: true,
          smartypants: false
        }
      }
    })
  ],
  entryComponents: [PostHelpComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    library.add(faHeart);
  }
}
