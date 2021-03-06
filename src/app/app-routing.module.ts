import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoryListComponent } from './components/stories/story-list/story-list.component';

const routes: Routes = [
  {path: 'stories', component: StoryListComponent },
  {path: '', pathMatch:'full', redirectTo:'stories'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
