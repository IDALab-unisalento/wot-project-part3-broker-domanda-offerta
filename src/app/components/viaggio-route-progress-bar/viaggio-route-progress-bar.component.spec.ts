import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViaggioRouteProgressBarComponent } from './viaggio-route-progress-bar.component';

describe('ViaggioRouteProgressBarComponent', () => {
  let component: ViaggioRouteProgressBarComponent;
  let fixture: ComponentFixture<ViaggioRouteProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViaggioRouteProgressBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViaggioRouteProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
