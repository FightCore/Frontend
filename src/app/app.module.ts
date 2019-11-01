import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModules } from './material-modules';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faHeart,
  faLock,
  faMugHot,
  faUserCircle,
  faAngleUp,
  faGamepad,
  faFile,
  faMask
} from '@fortawesome/free-solid-svg-icons';
import {
  faGithub,
  faDocker,
  faDiscord,
  faTwitter
} from '@fortawesome/free-brands-svg-icons';
import { NavBarComponent } from './layout/nav-bar/nav-bar.component';
import { PostComponent } from './pages/post/post.component';
import { ToastrModule } from 'ngx-toastr';
import { PostPreviewComponent } from './components/post-preview/post-preview.component';
import { AppRoutingModule } from './app-routing.module';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { GameSelectorComponent } from './components/game-selector/game-selector.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostHelpComponent } from './components/post-help/post-help.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthCallbackComponent } from './components/auth-callback/auth-callback.component';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
import { PostDisplayComponent } from './pages/post-display/post-display.component';
import { LikeButtonComponent } from './components/like-button/like-button.component';
import { EditPostComponent } from './pages/edit-post/edit-post.component';
import { CharacterPreviewComponent } from './components/character-preview/character-preview.component';
import { CharacterComponent } from './pages/character/character.component';
import { LoadingComponent } from './components/loading/loading.component';
import { CharacterDisplayComponent } from './pages/character-display/character-display.component';
import { CharacterEditComponent } from './pages/character-edit/character-edit.component';
import { CommonModule } from '@angular/common';
import { UserComponent } from './pages/user/user.component';
import { RegisterComponent } from './pages/register/register.component';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { TitlebarComponent } from './components/titlebar/titlebar.component';
import { CharacterPickerComponent } from './components/character-picker/character-picker.component';
import { AvatarModule } from 'ngx-avatar';
import { HomeComponent } from './pages/home/home.component';
import { TitleBarComponent } from './components/title-bar/title-bar.component';
import { FeaturedPostsComponent } from './components/featured-posts/featured-posts.component';
import { LatestPostsComponent } from './components/latest-posts/latest-posts.component';
import { DiscordComponent } from './components/discord/discord.component';
import { FooterComponent } from './layout/footer/footer.component';
import { TopScrollerComponent } from './components/top-scroller/top-scroller.component';
import { GameChipComponent } from './components/game-chip/game-chip.component';
import { GameDisplayComponent } from './pages/game-display/game-display.component';
import { GamePreviewComponent } from './components/game-preview/game-preview.component';
import { GameComponent } from './pages/game/game.component';
import { QuillModule } from 'ngx-quill';
import { PostPreviewDialogComponent } from './components/post-preview-dialog/post-preview-dialog.component';
// Import FontAwesome icons where needed.

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModules,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
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
    }),
    QuillModule.forRoot(),
    AvatarModule,
    MatPasswordStrengthModule.forRoot()
  ],
  declarations: [
    AppComponent,
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
    CharacterDisplayComponent,
    CharacterEditComponent,
    UserComponent,
    RegisterComponent,
    TitlebarComponent,
    CharacterPickerComponent,
    HomeComponent,
    TitleBarComponent,
    FeaturedPostsComponent,
    LatestPostsComponent,
    DiscordComponent,
    FooterComponent,
    TopScrollerComponent,
    GameChipComponent,
    GameDisplayComponent,
    GamePreviewComponent,
    GameComponent,
    PostPreviewDialogComponent
  ],
  entryComponents: [
    PostHelpComponent,
    RegisterComponent,
    PostPreviewDialogComponent
  ],
  providers: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    library.add(
      faHeart,
      faMugHot,
      faGithub,
      faDiscord,
      faDocker,
      faTwitter,
      faUserCircle,
      faLock,
      faAngleUp,
      faGamepad,
      faFile,
      faMask
    );
  }
}
