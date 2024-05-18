import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientNewsComponent } from './client-news.component';

describe('ClientNewsComponent', () => {
  let component: ClientNewsComponent;
  let fixture: ComponentFixture<ClientNewsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientNewsComponent]
    });
    fixture = TestBed.createComponent(ClientNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
