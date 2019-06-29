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
// Import FontAwesome icons where needed.

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    NavBarComponent,
    PostComponent,
    PostPreviewComponent,
    CreatePostComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModules,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    LMarkdownEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    library.add(faHeart);
  }
}
