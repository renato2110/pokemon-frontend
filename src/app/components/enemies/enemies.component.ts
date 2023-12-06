import { Component, Input } from '@angular/core';
import { Pokemon, PokemonType } from 'src/app/common/models';

@Component({
  selector: 'app-enemies',
  templateUrl: './enemies.component.html',
  styleUrls: ['./enemies.component.scss']
})
export class EnemiesComponent {
  @Input() enemy: Pokemon = {
    player: 'enemy',
    name: 'No name',
    life: 0,
    type: PokemonType.Normal
  };

  getAdvantage() {
    let advantage = ''
    switch (this.enemy.type) {
      case PokemonType.Fire:
        advantage = PokemonType.Water;
        break;
      case PokemonType.Water:
        advantage = PokemonType.Grass;
        break;
      case PokemonType.Grass:
        advantage = PokemonType.Fire;
        break;
      default:
        break;
    }
    return advantage;
  }

}
