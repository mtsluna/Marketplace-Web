import {AfterViewInit, Component, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {StoreAreaService} from '../../service/store-area.service';
import {MatPaginator} from '@angular/material/paginator';
import {StoreArea} from '../../model/storeArea';
import {Product} from '../../model/product';
import {ProductArea} from '../../model/productArea';
import {MatSort, MatSortable} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {StoreAreaTableModalComponent} from './store-area-table-modal/store-area-table-modal.component';

@Component({
  selector: 'app-store-area-table',
  templateUrl: './store-area-table.component.html',
  styleUrls: ['./store-area-table.component.css']
})
export class StoreAreaTableComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  dataSource = new MatTableDataSource();
  length = 0;
  page = 0;
  pages = 1;
  onCharge = false;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private storeAreaService: StoreAreaService, public dialog: MatDialog) {
    this.getStoreAreas(1)
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onPaginateChange(event) {
    this.getStoreAreas(event.pageIndex + 1)
    this.pages = event.pageIndex + 1
  }

  getStoreAreas(page: number){
    this.onCharge = true
    this.storeAreaService.getAllWithPagination(page).subscribe((data)=>{
      this.dataSource.data = data.body as ProductArea[]
      this.length = +data.headers.get('Content-Range').split('/')[1]
      this.paginator.length = +data.headers.get('Content-Range').split('/')[1]
      this.onCharge = false
    })
  }

  sortMethod(event){
    console.log(event)
    const data = this.dataSource.data.slice()
    this.dataSource.data = data.sort((a, b)=>{
      if (event.direction === 'asc'){
        return this.compare(a[event.active], b[event.active], true)
      }
      else if(event.direction === 'desc'){
        return this.compare(a[event.active], b[event.active], false)
      }
      else {
        return this.compare(a['id'], b['id'], true)
      }
    })

  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  openDialog(element: StoreArea = new StoreArea()) {
    (element == undefined) ? element = new StoreArea() : element;
    const dialogRef = this.dialog.open(StoreAreaTableModalComponent, {
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getStoreAreas(this.pages)
    });
  }

  public deleteStoreArea(storeArea: StoreArea){
    this.storeAreaService.deleteById(storeArea.id).subscribe((data)=>{
      this.dataSource.data.slice(this.dataSource.data.indexOf(storeArea), 1)
      this.getStoreAreas(this.pages)
    })
  }

}
