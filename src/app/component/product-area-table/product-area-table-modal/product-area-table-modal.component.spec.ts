import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAreaTableModalComponent } from './product-area-table-modal.component';

describe('ProductAreaTableModalComponent', () => {
  let component: ProductAreaTableModalComponent;
  let fixture: ComponentFixture<ProductAreaTableModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductAreaTableModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAreaTableModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
