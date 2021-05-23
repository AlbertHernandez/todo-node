export class CreateTodoDto {
  author: string;
  title: string;
  content: string;
  isCompleted: boolean;

  constructor(createTodoDto: {
    author: string;
    title: string;
    content: string;
    isCompleted?: boolean;
  }) {
    this.author = createTodoDto.author;
    this.title = createTodoDto.title;
    this.content = createTodoDto.content;
    this.isCompleted = createTodoDto.isCompleted ?? false;
  }
}
