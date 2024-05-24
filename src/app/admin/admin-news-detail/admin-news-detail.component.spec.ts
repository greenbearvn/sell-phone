import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNewsDetailComponent } from './admin-news-detail.component';

describe('AdminNewsDetailComponent', () => {
  let component: AdminNewsDetailComponent;
  let fixture: ComponentFixture<AdminNewsDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminNewsDetailComponent]
    });
    fixture = TestBed.createComponent(AdminNewsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
