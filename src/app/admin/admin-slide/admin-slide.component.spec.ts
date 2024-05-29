import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSlideComponent } from './admin-slide.component';

describe('AdminSlideComponent', () => {
  let component: AdminSlideComponent;
  let fixture: ComponentFixture<AdminSlideComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminSlideComponent]
    });
    fixture = TestBed.createComponent(AdminSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
