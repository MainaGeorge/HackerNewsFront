import { Observable } from "rxjs";
import { HNComment } from "./backend.hncomment.model";
import { HNStory } from "./backend.hnstory.model";


export interface HNStoryWithHNComments {
  hnComments: HNComment[];
  hnStory: HNStory;
}


export interface StoryWithComments {
  hnStory: Observable<HNStory>,
  hnComments:Observable<HNComment>[]
}
