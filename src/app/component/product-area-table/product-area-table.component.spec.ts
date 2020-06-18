import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAreaTableComponent } from './product-area-table.component';

describe('ProductAreaTableComponent', () => {
  let component: ProductAreaTableComponent;
  let fixture: ComponentFixture<ProductAreaTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductAreaTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAreaTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
