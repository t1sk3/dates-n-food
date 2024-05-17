import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTvDialogComponent } from './add-tv-dialog.component';

describe('AddTvDialogComponent', () => {
  let component: AddTvDialogComponent;
  let fixture: ComponentFixture<AddTvDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTvDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddTvDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
