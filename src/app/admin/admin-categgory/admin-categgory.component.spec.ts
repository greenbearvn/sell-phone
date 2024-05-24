import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCateggoryComponent } from './admin-categgory.component';

describe('AdminCateggoryComponent', () => {
  let component: AdminCateggoryComponent;
  let fixture: ComponentFixture<AdminCateggoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCateggoryComponent]
    });
    fixture = TestBed.createComponent(AdminCateggoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
