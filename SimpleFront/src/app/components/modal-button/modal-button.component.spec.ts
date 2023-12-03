import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalButtonComponent } from './modal-button.component';

describe('ModalButtonComponent', () => {
  let component: ModalButtonComponent;
  let fixture: ComponentFixture<ModalButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalButtonComponent]
    });
    fixture = TestBed.createComponent(ModalButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
