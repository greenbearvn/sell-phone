import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategoryCreateComponent } from './admin-category-create.component';

describe('AdminCategoryCreateComponent', () => {
  let component: AdminCategoryCreateComponent;
  let fixture: ComponentFixture<AdminCategoryCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCategoryCreateComponent]
    });
    fixture = TestBed.createComponent(AdminCategoryCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
