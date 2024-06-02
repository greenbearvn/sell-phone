import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSlideCreateComponent } from './admin-slide-create.component';

describe('AdminSlideCreateComponent', () => {
  let component: AdminSlideCreateComponent;
  let fixture: ComponentFixture<AdminSlideCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminSlideCreateComponent]
    });
    fixture = TestBed.createComponent(AdminSlideCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
