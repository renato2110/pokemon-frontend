import { Component, Input } from '@angular/core';
import { PokemonAttack, PokemonType } from 'src/app/common/models';

@Component({
  selector: 'app-attacks',
  templateUrl: './attacks.component.html',
  styleUrls: ['./attacks.component.scss']
})
export class AttacksComponent {
  @Input() attack: PokemonAttack = {
    type: PokemonType.Normal,
    power: 0
  };
  @Input() id: number = 0;

}
