import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Insurer } from './insurer';

describe('Insurer', () => {
  let component: Insurer;
  let fixture: ComponentFixture<Insurer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Insurer],
    }).compileComponents();

    fixture = TestBed.createComponent(Insurer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
