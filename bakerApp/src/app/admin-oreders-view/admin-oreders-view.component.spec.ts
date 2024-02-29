import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOredersViewComponent } from './admin-oreders-view.component';

describe('AdminOredersViewComponent', () => {
  let component: AdminOredersViewComponent;
  let fixture: ComponentFixture<AdminOredersViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminOredersViewComponent]
    });
    fixture = TestBed.createComponent(AdminOredersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
