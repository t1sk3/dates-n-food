import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTvDialogComponent } from './edit-tv-dialog.component';

describe('EditTvDialogComponent', () => {
  let component: EditTvDialogComponent;
  let fixture: ComponentFixture<EditTvDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditTvDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditTvDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
