export type Todo = {
  id: string;
  author: string;
  title: string;
  content: string;
  isCompleted: boolean;
};

export type TodoFilter = {
  author?: string;
  isCompleted?: boolean;
};

export enum TodoValues {
  ID = "id",
  AUTHOR = "author",
  TITLE = "title",
  CONTENT = "content",
  IS_COMPLETED = "isCompleted",
}
