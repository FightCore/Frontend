import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostComponent } from './pages/post/post.component';
import { StaticRoutes } from './routes/static-routes';
import { CreatePostComponent } from './pages/create-post/create-post.component';

const routes: Routes = [
  { path: StaticRoutes.createPost, component: CreatePostComponent },
  { path: StaticRoutes.posts, component: PostComponent},
  { path: '**', redirectTo: StaticRoutes.posts }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
