import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserDetailComponent } from './admin-user-detail.component';

describe('AdminUserDetailComponent', () => {
  let component: AdminUserDetailComponent;
  let fixture: ComponentFixture<AdminUserDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminUserDetailComponent]
    });
    fixture = TestBed.createComponent(AdminUserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
