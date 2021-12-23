import { HNBaseItem } from "./backend.hnbase-item.model";

export interface HNStory extends HNBaseItem{
  descendants: number;
  score: number;
  title: string;
  url: string;
}
