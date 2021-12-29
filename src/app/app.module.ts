import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoryListComponent } from './components/stories/story-list/story-list.component';
import { StoryComponent } from './components/stories/story-list/story/story.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { CommentComponent } from './components/stories/story-list/comments/comment/comment.component';
import { CommentsComponent } from './components/stories/story-list/comments/comments.component';


@NgModule({
  declarations: [
    AppComponent,
    StoryListComponent,
    StoryComponent,
    CommentComponent,
    CommentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
