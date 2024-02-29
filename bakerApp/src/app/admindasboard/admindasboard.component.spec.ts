import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindasboardComponent } from './admindasboard.component';

describe('AdmindasboardComponent', () => {
  let component: AdmindasboardComponent;
  let fixture: ComponentFixture<AdmindasboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdmindasboardComponent]
    });
    fixture = TestBed.createComponent(AdmindasboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
