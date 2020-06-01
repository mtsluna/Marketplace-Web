import { Component, OnInit } from '@angular/core';
import {StoreService} from '../../service/store.service';
import {Store} from '../../model/store';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  stores: Store [];
  onCharge: boolean = false;

  constructor(private storeService: StoreService) {
    this.getAllStores();
  }

  ngOnInit(): void {

  }

  getAllStores(){
    this.onCharge = true;
    this.storeService.getAll().subscribe((data)=>{
      this.stores = data;
      console.log(data);
      this.onCharge = false;
    })
  }

}
