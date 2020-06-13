import {User} from "./user";

export class Token {
  token: string;
  refresh_token: string;
  user: User;
}
