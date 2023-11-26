import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Pokemon, PokemonAttack } from 'src/app/common/models';

@Component({
  selector: 'app-enemy-attack-modal',
  templateUrl: './enemy-attack-modal.component.html',
  styleUrls: ['./enemy-attack-modal.component.scss'],
})
export class EnemyAttackModalComponent {
  @Input() enemies: Pokemon[] = [];
  @Input() attacks: PokemonAttack[] = [];
  @Output() attackEvent = new EventEmitter<number[]>();
  @Output() closeModalEvent = new EventEmitter<void>();

  selectedEnemyIndex: number = 0;
  selectedAttackIndex: number = 0;

  attack() {
    this.attackEvent.emit([
      Number(this.selectedEnemyIndex),
      this.selectedAttackIndex - 1,
    ]);
    this.closeModal();
  }

  closeModal() {
    this.closeModalEvent.emit();
  }

  getEnemy(id: number) {
    const enemy = this.enemies.find((enemy) => Number(id) === enemy.id);
    return enemy ?? this.enemies[0];
  }
}
