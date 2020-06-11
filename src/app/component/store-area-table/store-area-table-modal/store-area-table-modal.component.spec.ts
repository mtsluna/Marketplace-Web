import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreAreaTableModalComponent } from './store-area-table-modal.component';

describe('StoreAreaTableModalComponent', () => {
  let component: StoreAreaTableModalComponent;
  let fixture: ComponentFixture<StoreAreaTableModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreAreaTableModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreAreaTableModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
