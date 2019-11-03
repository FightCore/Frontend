import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostComponent } from './pages/post/post.component';
import { StaticRoutes } from './routes/static-routes';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthCallbackComponent } from './components/auth-callback/auth-callback.component';
import { PostDisplayComponent } from './pages/post-display/post-display.component';
import { EditPostComponent } from './pages/edit-post/edit-post.component';
import { CharacterComponent } from './pages/character/character.component';
import { CharacterDisplayComponent } from './pages/character-display/character-display.component';
import { CharacterEditComponent } from './pages/character-edit/character-edit.component';
import { UserComponent } from './pages/user/user.component';
import { HomeComponent } from './pages/home/home.component';
import { GameDisplayComponent } from './pages/game-display/game-display.component';
import { GameComponent } from './pages/game/game.component';
import { TournamentsComponent } from './pages/tournaments/tournaments.component';

const routes: Routes = [
  { path: StaticRoutes.createPost, component: CreatePostComponent },
  { path: StaticRoutes.login, component: LoginComponent},
  { path: StaticRoutes.authCallback, component: AuthCallbackComponent},
  { path: StaticRoutes.posts, component: PostComponent},
  { path: StaticRoutes.editPost, component: EditPostComponent },
  { path: StaticRoutes.viewPost, component: PostDisplayComponent},
  { path: StaticRoutes.characters, component: CharacterComponent },
  { path: StaticRoutes.editCharacter, component: CharacterEditComponent },
  { path: StaticRoutes.viewCharacter, component: CharacterDisplayComponent },
  { path: StaticRoutes.viewUser, component: UserComponent },
  { path: StaticRoutes.viewGame, component: GameDisplayComponent },
  { path: StaticRoutes.game, component: GameComponent },
  { path: StaticRoutes.home, component: HomeComponent },
  { path: 'tournament', component: TournamentsComponent },
  { path: '**', redirectTo: StaticRoutes.home }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
