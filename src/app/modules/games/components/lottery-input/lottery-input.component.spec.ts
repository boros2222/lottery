import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotteryInputComponent } from './lottery-input.component';

describe('LotteryInputComponent', () => {
  let component: LotteryInputComponent;
  let fixture: ComponentFixture<LotteryInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LotteryInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LotteryInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
