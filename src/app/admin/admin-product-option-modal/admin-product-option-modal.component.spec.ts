import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductOptionModalComponent } from './admin-product-option-modal.component';

describe('AdminProductOptionModalComponent', () => {
  let component: AdminProductOptionModalComponent;
  let fixture: ComponentFixture<AdminProductOptionModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminProductOptionModalComponent]
    });
    fixture = TestBed.createComponent(AdminProductOptionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
