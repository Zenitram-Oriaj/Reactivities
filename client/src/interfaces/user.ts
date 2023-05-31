export interface IUser {
  username: string;
  displayName: string;
  image?: string | null;
  token: string | null;
}

export interface IUserFormValues {
  email: string;
  password: string;
  displayName?: string;
  username?: string;
}