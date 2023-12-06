import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { PokemonType } from 'src/app/common/models';

@Component({
  selector: 'app-pokemon-form-modal',
  templateUrl: './pokemon-form-modal.component.html',
  styleUrls: ['./pokemon-form-modal.component.scss'],
})
export class PokemonFormModalComponent implements OnInit {
  pokemonForm!: FormGroup;
  pokemonTypes = Object.values(PokemonType);
  @Input() player: string = '';
  @Output() editEvent = new EventEmitter<object>();
  @Output() closeModalEvent = new EventEmitter<void>();

  constructor(private formBuilder: FormBuilder) {
    this.pokemonForm = this.formBuilder.group({
      name: ['', Validators.required],
      player: [this.player, Validators.required],
      type: ['', Validators.required],
      life: [
        '',
        [Validators.required, Validators.min(1), Validators.max(9999)],
      ],
      attacks: this.formBuilder.array([this.createAttack()]),
    });
  }

  ngOnInit() {
    this.pokemonForm = this.formBuilder.group({
      name: ['', Validators.required],
      player: [this.player, Validators.required],
      type: ['', Validators.required],
      life: ['', [Validators.required, Validators.min(1), Validators.max(9999)]],
      attacks: this.formBuilder.array([this.createAttack()]),
    });
  }

  get attacks() {
    return this.pokemonForm.get('attacks') as FormArray;
  }

  addAttack() {
    if (this.attacks.length < 4) {
      this.attacks.push(this.createAttack());
    }
  }

  createAttack() {
    return this.formBuilder.group({
      type: ['', Validators.required],
      power: [
        '',
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
    });
  }

  onSubmit() {
    this.editEvent.emit(this.pokemonForm.value);
    this.closeModal();
  }

  closeModal() {
    this.closeModalEvent.emit();
  }
}
