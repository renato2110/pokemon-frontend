import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnemyAttackModalComponent } from './enemy-attack-modal.component';

describe('EnemyAttackModalComponent', () => {
  let component: EnemyAttackModalComponent;
  let fixture: ComponentFixture<EnemyAttackModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnemyAttackModalComponent]
    });
    fixture = TestBed.createComponent(EnemyAttackModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
