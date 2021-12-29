import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Comment } from 'src/app/services/app-service/app.comment.model';
import { AppStoryService } from 'src/app/services/app-service/app.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit, OnDestroy{


  commentsSubscription!: Subscription;
  comments$!: Observable<Comment[]>;
  constructor(public appService: AppStoryService) { }


  ngOnInit(): void {
     this.commentsSubscription = this.appService.emittedComments$.subscribe(res => this.comments$ = res);
  }

  ngOnDestroy(): void {
    this.commentsSubscription.unsubscribe();
  }


  }
