import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyVectorsComponent } from './my-vectors.component';

describe('MyVectorsComponent', () => {
  let component: MyVectorsComponent;
  let fixture: ComponentFixture<MyVectorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyVectorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyVectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
