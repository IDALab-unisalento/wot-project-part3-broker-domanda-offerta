import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBlankComponent } from './modal-blank.component';

describe('ModalBlankComponent', () => {
  let component: ModalBlankComponent;
  let fixture: ComponentFixture<ModalBlankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalBlankComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBlankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
