
export interface HNComment {
    parent: number;
  text: string;
  by: string;
  id: number;
  time: number;
  type: string;
  kids: number[]
}
