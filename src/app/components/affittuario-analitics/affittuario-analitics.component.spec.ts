import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffittuarioAnaliticsComponent } from './affittuario-analitics.component';

describe('AffittuarioAnaliticsComponent', () => {
  let component: AffittuarioAnaliticsComponent;
  let fixture: ComponentFixture<AffittuarioAnaliticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffittuarioAnaliticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffittuarioAnaliticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
