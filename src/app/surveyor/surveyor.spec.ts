import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Surveyor } from './surveyor';

describe('Surveyor', () => {
  let component: Surveyor;
  let fixture: ComponentFixture<Surveyor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Surveyor],
    }).compileComponents();

    fixture = TestBed.createComponent(Surveyor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
