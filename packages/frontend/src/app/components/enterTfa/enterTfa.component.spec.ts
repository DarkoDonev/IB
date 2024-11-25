import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterTfaComponent } from './enterTfa.component';

describe('LoginComponent', () => {
  let component: EnterTfaComponent;
  let fixture: ComponentFixture<EnterTfaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterTfaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterTfaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
