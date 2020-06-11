import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreAreaTableComponent } from './store-area-table.component';

describe('StoreAreaTableComponent', () => {
  let component: StoreAreaTableComponent;
  let fixture: ComponentFixture<StoreAreaTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreAreaTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreAreaTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
