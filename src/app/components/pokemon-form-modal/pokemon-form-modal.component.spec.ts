import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonFormModalComponent } from './pokemon-form-modal.component';

describe('PokemonFormModalComponent', () => {
  let component: PokemonFormModalComponent;
  let fixture: ComponentFixture<PokemonFormModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonFormModalComponent]
    });
    fixture = TestBed.createComponent(PokemonFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
