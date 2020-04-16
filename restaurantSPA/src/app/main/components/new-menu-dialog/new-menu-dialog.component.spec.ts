import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMenuDialogComponent } from './new-menu-dialog.component';

describe('NewMenuDialogComponent', () => {
  let component: NewMenuDialogComponent;
  let fixture: ComponentFixture<NewMenuDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewMenuDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMenuDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
