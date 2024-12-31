export interface SignupRequestBody {
  email: string;
  password: string;
  fullname: string;
  username: string;
}

export interface SigninRequestBody {
  email?: string;
  password: string;
  username?: string;
}
