export interface ISignUp {
  name: string;
  username: string;
  email: string;
  password: string;
}

export class SignUp implements SignUp {
  name: string = '';
  username: string = '';
  email: string = '';
  password: string = '';
}
