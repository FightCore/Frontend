import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModules } from './material-modules';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faMugHot
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
import { PostPreviewComponent } from './components/posts/post-preview/post-preview.component';
import { AppRoutingModule } from './app-routing.module';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { GameSelectorComponent } from './components/games/game-selector/game-selector.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostHelpComponent } from './components/posts/post-help/post-help.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthCallbackComponent } from './pages/auth-callback/auth-callback.component';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
import { PostDisplayComponent } from './pages/post-display/post-display.component';
import { LikeButtonComponent } from './components/posts/like-button/like-button.component';
import { EditPostComponent } from './pages/edit-post/edit-post.component';
import { CharacterPreviewComponent } from './components/characters/character-preview/character-preview.component';
import { CharacterComponent } from './pages/character/character.component';
import { LoadingComponent } from './components/common/loading/loading.component';
import { CharacterDisplayComponent } from './pages/character-display/character-display.component';
import { CharacterEditComponent } from './pages/character-edit/character-edit.component';
import { CommonModule } from '@angular/common';
import { UserComponent } from './pages/user/user.component';
import { RegisterComponent } from './pages/register/register.component';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { TitlebarComponent } from './components/common/titlebar/titlebar.component';
import { CharacterPickerComponent } from './components/characters/character-picker/character-picker.component';
import { AvatarModule } from 'ngx-avatar';
import { HomeComponent } from './pages/home/home.component';
import { TitleBarComponent } from './components/frontpage/title-bar/title-bar.component';
import { FeaturedPostsComponent } from './components/posts/featured-posts/featured-posts.component';
import { LatestPostsComponent } from './components/posts/latest-posts/latest-posts.component';
import { DiscordComponent } from './components/frontpage/discord/discord.component';
import { FooterComponent } from './layout/footer/footer.component';
import { TopScrollerComponent } from './components/common/top-scroller/top-scroller.component';
import { GameChipComponent } from './components/games/game-chip/game-chip.component';
import { GameDisplayComponent } from './pages/game-display/game-display.component';
import { GamePreviewComponent } from './components/games/game-preview/game-preview.component';
import { GameComponent } from './pages/game/game.component';
import { QuillModule } from 'ngx-quill';
import { PostPreviewDialogComponent } from './components/posts/post-preview-dialog/post-preview-dialog.component';
import { GeneralInformationComponent } from './components/characters/general-information/general-information.component';
import { NotablePlayerComponent } from './components/characters/notable-player/notable-player.component';
import { ContributorListComponent } from './components/characters/contributor-list/contributor-list.component';
import { SocialsComponent } from './components/frontpage/socials/socials.component';
import { EditsOverviewComponent } from './components/characters/edits-overview/edits-overview.component';
import { NgxTextDiffModule } from 'ngx-text-diff';
import { NgxFlagPickerModule } from 'ngx-flag-picker';
import { DashboardComponent } from './pages/edits/dashboard/dashboard.component';
import { CharacterEditOverviewComponent } from './components/edits/character-edit-overview/character-edit-overview.component';
import { NotablePlayerEditComponent } from './components/edits/view/notable-player-edit/notable-player-edit.component';
import { WebsiteEditComponent } from './components/edits/view/website-edit/website-edit.component';
import { VideoEditComponent } from './components/edits/view/video-edit/video-edit.component';
import { UpdateWebsiteEditComponent } from './components/edits/edit/update-website-edit/update-website-edit.component';
import { UpdateNotablePlayerEditComponent } from './components/edits/edit/update-notable-player-edit/update-notable-player-edit.component';
import { TopContributorsComponent } from './components/edits/top-contributors/top-contributors.component';
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
    MatPasswordStrengthModule.forRoot(),
    NgxTextDiffModule,
    NgxFlagPickerModule
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
    PostPreviewDialogComponent,
    GeneralInformationComponent,
    NotablePlayerComponent,
    ContributorListComponent,
    SocialsComponent,
    EditsOverviewComponent,
    DashboardComponent,
    CharacterEditOverviewComponent,
    NotablePlayerEditComponent,
    WebsiteEditComponent,
    VideoEditComponent,
    UpdateWebsiteEditComponent,
    UpdateNotablePlayerEditComponent,
    TopContributorsComponent
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
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faMugHot,
      faGithub,
      faDiscord,
      faDocker,
      faTwitter
    );
  }
}
