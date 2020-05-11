import {Client} from './client';
import {PurchaseDetail} from './purchaseDetail';

export class Purchase {

  id: number;
  date: string;
  client: Client;
  details: PurchaseDetail[] = [];

}
