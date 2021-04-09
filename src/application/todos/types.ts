export type Todo = {
  [TodoValues.ID]: string;
  [TodoValues.AUTHOR]: string;
  [TodoValues.TITLE]: string;
  [TodoValues.CONTENT]: string;
  [TodoValues.IS_COMPLETED]: boolean;
};

export enum TodoValues {
  ID = "id",
  AUTHOR = "author",
  TITLE = "title",
  CONTENT = "content",
  IS_COMPLETED = "isCompleted",
}
