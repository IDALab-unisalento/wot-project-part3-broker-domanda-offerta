import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffittuarioHomeComponent } from './affittuario-home.component';

describe('AffittuarioHomeComponent', () => {
  let component: AffittuarioHomeComponent;
  let fixture: ComponentFixture<AffittuarioHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffittuarioHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffittuarioHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
