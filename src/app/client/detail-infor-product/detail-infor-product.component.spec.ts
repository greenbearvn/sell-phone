import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailInforProductComponent } from './detail-infor-product.component';

describe('DetailInforProductComponent', () => {
  let component: DetailInforProductComponent;
  let fixture: ComponentFixture<DetailInforProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailInforProductComponent]
    });
    fixture = TestBed.createComponent(DetailInforProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
