export interface IUser {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  fullName: string;
  following: string[];
  followers: string[];
}

export interface IUserState {
  currentUser: IUser | null;
  isLoading: boolean;
  error: string | null;
} 