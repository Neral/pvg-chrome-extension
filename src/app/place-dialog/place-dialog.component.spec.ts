import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceDialogComponent } from './place-dialog.component';

describe('PlaceDialogComponent', () => {
  let component: PlaceDialogComponent;
  let fixture: ComponentFixture<PlaceDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
