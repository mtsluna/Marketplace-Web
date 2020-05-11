import {Address} from './address';
import {Purchase} from './purchase';
import {User} from './user';

export class Client {

  id: number;
  name: string;
  surname: string;
  dni: number;
  address: Address;
  purchase: Purchase[] = [];
  user: User;

}
