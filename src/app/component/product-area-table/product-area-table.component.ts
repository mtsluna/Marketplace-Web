import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ProductArea} from '../../model/productArea';
import {ProductAreaService} from '../../service/product-area.service';
import {ProductAreaTableModalComponent} from './product-area-table-modal/product-area-table-modal.component';

@Component({
  selector: 'app-product-area-table',
  templateUrl: './product-area-table.component.html',
  styleUrls: ['./product-area-table.component.css']
})
export class ProductAreaTableComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  dataSource = new MatTableDataSource();
  length = 0;
  page = 0;
  pages = 1;
  onCharge = false;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private productAreaService: ProductAreaService, public dialog: MatDialog) {
    this.getProductAreas(1)
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
    this.getProductAreas(event.pageIndex + 1);
    this.pages = event.pageIndex + 1;
  }

  getProductAreas(page: number){
    this.onCharge = true
    this.productAreaService.getAllWithPagination(page).subscribe((data)=>{
      this.dataSource.data = data.body as ProductArea[];
      this.length = +data.headers.get('Content-Range').split('/')[1];
      this.paginator.length = +data.headers.get('Content-Range').split('/')[1]
      this.onCharge = false;
    })
  }

  sortMethod(event){
    console.log(event)
    const data = this.dataSource.data.slice();
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

  openDialog(element: ProductArea = new ProductArea()) {
    (element == undefined) ? element = new ProductArea() : element;
    const dialogRef = this.dialog.open(ProductAreaTableModalComponent, {
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getProductAreas(this.pages)
    });
  }

  public deleteProductArea(productArea: ProductArea){
    this.productAreaService.deleteById(productArea.id).subscribe((data)=>{
      this.dataSource.data.slice(this.dataSource.data.indexOf(productArea), 1)
      this.getProductAreas(this.pages)
    })
  }

}
