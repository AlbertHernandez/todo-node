export class CreateAccountDto {
  name: string;
  email: string;

  constructor(dependencies: { name: string; email: string }) {
    this.name = dependencies.name;
    this.email = dependencies.email;
  }
}
