import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModules } from './material-modules';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faMugHot } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faDocker, faDiscord, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { NavBarComponent } from './layout/nav-bar/nav-bar.component';
import { PostComponent } from './pages/post/post.component';
import { ToastrModule } from 'ngx-toastr';
import { PostPreviewComponent } from './components/posts/post-preview/post-preview.component';
import { AppRoutingModule } from './app-routing.module';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { GameSelectorComponent } from './components/games/game-selector/game-selector.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostHelpComponent } from './components/posts/post-help/post-help.component';
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
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { TitlebarComponent } from './components/common/titlebar/titlebar.component';
import { CharacterPickerComponent } from './components/characters/character-picker/character-picker.component';
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
import { PostPreviewDialogComponent } from './components/posts/post-preview-dialog/post-preview-dialog.component';
import { GeneralInformationComponent } from './components/characters/general-information/general-information.component';
import { NotablePlayerComponent } from './components/characters/notable-player/notable-player.component';
import { ContributorListComponent } from './components/characters/contributor-list/contributor-list.component';
import { SocialsComponent } from './components/frontpage/socials/socials.component';
import { EditsOverviewComponent } from './components/characters/edits-overview/edits-overview.component';
import { NgxTextDiffModule } from 'ngx-text-diff';
import { DashboardComponent } from './pages/edits/dashboard/dashboard.component';
import { CharacterEditOverviewComponent } from './components/edits/character-edit-overview/character-edit-overview.component';
import { NotablePlayerEditComponent } from './components/edits/view/notable-player-edit/notable-player-edit.component';
import { WebsiteEditComponent } from './components/edits/view/website-edit/website-edit.component';
import { VideoEditComponent } from './components/edits/view/video-edit/video-edit.component';
import { UpdateWebsiteEditComponent } from './components/edits/edit/update-website-edit/update-website-edit.component';
import { UpdateNotablePlayerEditComponent } from './components/edits/edit/update-notable-player-edit/update-notable-player-edit.component';
import { TopContributorsComponent } from './components/edits/top-contributors/top-contributors.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LanguageComponent } from './components/common/language/language.component';
import { EditMetaDataComponent } from './components/posts/editor/edit-meta-data/edit-meta-data.component';
import { EditPostTextComponent } from './components/posts/editor/edit-post-text/edit-post-text.component';
import { EditIntialPostComponent } from './components/posts/editor/edit-intial-post/edit-intial-post.component';
import { MoveDisplayComponent } from './components/frame-data/move-display/move-display.component';
import { HitboxTableDialogComponent } from './components/frame-data/hitbox-table-dialog/hitbox-table-dialog.component';
import { CharacterAttributesComponent } from './components/frame-data/character-attributes/character-attributes.component';
import { CreateCommentComponent } from './components/posts/comments/create-comment/create-comment.component';
import { ViewCommentsComponent } from './components/posts/comments/view-comments/view-comments.component';
import { EditNotablePlayerComponent } from './components/characters/edit/edit-notable-player/edit-notable-player.component';
import { EditWebsiteResourceComponent } from './components/characters/edit/edit-website-resource/edit-website-resource.component';
import { EditVideoResourceComponent } from './components/characters/edit/edit-video-resource/edit-video-resource.component';
import { FramedataOverviewComponent } from './pages/framedata/framedata-overview/framedata-overview.component';
import { TechniquesComponent } from './pages/posts/techniques/techniques.component';
import { FramedataCharacterComponent } from './pages/framedata/framedata-character/framedata-character.component';
import { FramedataViewMoveComponent } from './pages/framedata/framedata-view-move/framedata-view-move.component';
import { ViewMoveDialogComponent } from './components/frame-data/view-move-dialog/view-move-dialog.component';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { TokenInterceptor } from 'src/app/interceptors/http-token-interceptor';
import { LoginDialogComponent } from './components/auth/login-dialog/login-dialog.component';
import { RegisterComponent } from './pages/register/register.component';
import { StoreModule } from '@ngrx/store';
import { userReducer } from 'src/app/store/user/user.reducer';
import { ChangeUsernameDialogComponent } from './components/user/change-username-dialog/change-username-dialog.component';
import { UserOptionsButtonComponent } from './components/auth/user-options-button/user-options-button.component';
import { EditUserComponent } from './pages/users/edit-user/edit-user.component';

// AoT requires an exported function for factories
// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
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
          smartypants: false,
        },
      },
    }),
    MatPasswordStrengthModule.forRoot(),
    NgxTextDiffModule,
    EditorModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
      defaultLanguage: 'en',
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    StoreModule.forRoot({ user: userReducer }),
  ],
  declarations: [
    AppComponent,
    NavBarComponent,
    PostComponent,
    PostPreviewComponent,
    CreatePostComponent,
    GameSelectorComponent,
    PostHelpComponent,
    PostDisplayComponent,
    LikeButtonComponent,
    EditPostComponent,
    CharacterPreviewComponent,
    CharacterComponent,
    LoadingComponent,
    CharacterDisplayComponent,
    CharacterEditComponent,
    UserComponent,
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
    TopContributorsComponent,
    LanguageComponent,
    EditMetaDataComponent,
    EditPostTextComponent,
    EditIntialPostComponent,
    HitboxTableDialogComponent,
    MoveDisplayComponent,
    CharacterAttributesComponent,
    CreateCommentComponent,
    ViewCommentsComponent,
    EditNotablePlayerComponent,
    EditWebsiteResourceComponent,
    EditVideoResourceComponent,
    FramedataOverviewComponent,
    TechniquesComponent,
    FramedataCharacterComponent,
    FramedataViewMoveComponent,
    ViewMoveDialogComponent,
    LoginDialogComponent,
    RegisterComponent,
    ChangeUsernameDialogComponent,
    UserOptionsButtonComponent,
    EditUserComponent,
  ],
  entryComponents: [PostHelpComponent, PostPreviewDialogComponent, HitboxTableDialogComponent],
  providers: [
    AppComponent,
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faMugHot, faGithub, faDiscord, faDocker, faTwitter);
  }
}
