import { HNComment } from "./backend.hncomment.model";
import { HNStory } from "./backend.hnstory.model";


export interface HNStoryWithHNComments {
  hnComments: HNComment[];
  hnStory: HNStory;
}
