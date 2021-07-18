import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTimeErrorComponent } from './modal-time-error.component';

describe('ModalTimeErrorComponent', () => {
  let component: ModalTimeErrorComponent;
  let fixture: ComponentFixture<ModalTimeErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalTimeErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTimeErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
