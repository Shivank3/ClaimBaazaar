import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Irda } from './irda';

describe('Irda', () => {
  let component: Irda;
  let fixture: ComponentFixture<Irda>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Irda],
    }).compileComponents();

    fixture = TestBed.createComponent(Irda);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
