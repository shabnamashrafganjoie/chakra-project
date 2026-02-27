export interface AdminUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role?: string;
  age?:number;
  username?:string;
  password?:string;
}


export interface UserState {
  loading: boolean;
  users: AdminUser[];
  error: string | null;
}