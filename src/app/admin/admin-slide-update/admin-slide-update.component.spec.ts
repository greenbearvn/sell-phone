import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSlideUpdateComponent } from './admin-slide-update.component';

describe('AdminSlideUpdateComponent', () => {
  let component: AdminSlideUpdateComponent;
  let fixture: ComponentFixture<AdminSlideUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminSlideUpdateComponent]
    });
    fixture = TestBed.createComponent(AdminSlideUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
