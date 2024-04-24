export interface IAuth {
  username: string;
  password: string;
}

export interface IRegister extends IAuth {
  email: string;
  role: string;
}
