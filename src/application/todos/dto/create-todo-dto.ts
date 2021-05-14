export class CreateTodoDto {
  readonly author!: string

  readonly title!: string

  readonly content!: string

  readonly isCompleted: boolean = false
}
