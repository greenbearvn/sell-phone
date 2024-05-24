import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserModalComponent } from './admin-user-modal.component';

describe('AdminUserModalComponent', () => {
  let component: AdminUserModalComponent;
  let fixture: ComponentFixture<AdminUserModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminUserModalComponent]
    });
    fixture = TestBed.createComponent(AdminUserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
