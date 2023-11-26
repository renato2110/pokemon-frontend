import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnemiesComponent } from './enemies.component';

describe('EnemiesComponent', () => {
  let component: EnemiesComponent;
  let fixture: ComponentFixture<EnemiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnemiesComponent]
    });
    fixture = TestBed.createComponent(EnemiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
