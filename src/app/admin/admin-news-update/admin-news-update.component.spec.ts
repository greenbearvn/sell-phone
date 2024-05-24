import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNewsUpdateComponent } from './admin-news-update.component';

describe('AdminNewsUpdateComponent', () => {
  let component: AdminNewsUpdateComponent;
  let fixture: ComponentFixture<AdminNewsUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminNewsUpdateComponent]
    });
    fixture = TestBed.createComponent(AdminNewsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
