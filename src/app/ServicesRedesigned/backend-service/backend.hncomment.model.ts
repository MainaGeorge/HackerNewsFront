import { HNBaseItem } from "./backend.hnbase-item.model";

export interface HNComment extends HNBaseItem{
    parent: number;
    text: string;
}
