import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CakeDetailViewComponent } from './cake-detail-view.component';

describe('CakeDetailViewComponent', () => {
  let component: CakeDetailViewComponent;
  let fixture: ComponentFixture<CakeDetailViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CakeDetailViewComponent]
    });
    fixture = TestBed.createComponent(CakeDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
