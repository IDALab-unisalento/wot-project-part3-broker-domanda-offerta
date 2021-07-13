import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalErrorVectorComponent } from './modal-error-vector.component';

describe('ModalErrorVectorComponent', () => {
  let component: ModalErrorVectorComponent;
  let fixture: ComponentFixture<ModalErrorVectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalErrorVectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalErrorVectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
