import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostComponent } from './pages/post/post.component';
import { StaticRoutes } from './routes/static-routes';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { LoginComponent } from './login/login.component';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';

const routes: Routes = [
  { path: StaticRoutes.createPost, component: CreatePostComponent },
  { path: 'login', component: LoginComponent},
  { path: 'auth-callback', component: AuthCallbackComponent},
  { path: StaticRoutes.posts, component: PostComponent},
  { path: '**', redirectTo: StaticRoutes.posts }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
