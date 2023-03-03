export interface User {
  id: number;
  email: string;
  pseudo: string;
  role: string;
  updateAt: Date;
  createAt: Date;
}

export interface RegisterData {
  email: string;
  pseudo: string;
  password: string;
  passwordConfirmation: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface UpdateUserData {
  email: string;
  pseudo: string;
}