import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostComponent } from './pages/post/post.component';

const routes: Routes = [
  { component: PostComponent, path: 'posts'},
  { path: '', redirectTo: 'posts' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
