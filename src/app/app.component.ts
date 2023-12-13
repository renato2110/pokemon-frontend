import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Pokemon, PokemonAttack, PokemonType } from './common/models';

// const url = 'https://pokemon-backend-one.vercel.app/pokemon';
const url = 'http://localhost:3000/pokemon';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  name: string = 'Sin nombre';
  life: number = 0;
  type: PokemonType = PokemonType.Normal;
  state: string = 'desconectado';
  gymState: string = 'desconectado';
  attacks: PokemonAttack[] = [];
  advantage: string = '';
  disadvantage: string = '';
  showAttackModal: boolean = false;
  showMessageModal: boolean = false;
  messageBody: string = 'Message';
  showEditModal: boolean = false;

  enemies: Pokemon[] = [];

  async ngOnInit() {
    while (true) {
      await this.refreshData();
      await this.delay(3000);
    }
  }

  constructor(private http: HttpClient) { }

  async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async refreshData() {
    try {
      const response = await this.http.get<any>(`${url}/info`, httpOptions).toPromise();
      const data = response.data;

      this.name = data.name;
      this.life = data.life;
      this.type = data.type;
      switch (this.type) {
        case PokemonType.Fire:
          this.advantage = PokemonType.Grass;
          this.disadvantage = PokemonType.Water;
          break;
        case PokemonType.Water:
          this.advantage = PokemonType.Fire;
          this.disadvantage = PokemonType.Grass;
          break;
        case PokemonType.Grass:
          this.advantage = PokemonType.Water;
          this.disadvantage = PokemonType.Fire;
          break;
        default:
          break;
      }

      this.state = data.state;
      this.attacks = data.attacks;

      this.enemies = data.enemies;
      this.gymState = data.gymState;
    } catch (error) {
      this.name = 'Sin nombre';
      this.life = 0;
      this.type = PokemonType.Normal;
      this.state = 'desconectado';
      this.attacks = [];
      this.advantage = '';
      this.disadvantage = '';
      this.enemies = [];

      this.closeAttackModal();
      this.closeEditModal();
    }
  }

  joinMatch() {
    this.http
      .post<any>(
        `${url}/unirse`,
        httpOptions
      )
      .subscribe({
        next: () => this.openMessageModal(`Pokémon agregado a la batalla satisfactoriamente!`),
        error: (error) => this.openMessageModal(`Pokémon no pudo ser agregado a la batalla!\n ERROR: ${error.error.message}`)
      });
  }

  handleAttack(indexes: number[]) {
    const enemy = this.enemies[indexes[0]];
    const attack = this.attacks[indexes[1]];

    const body = {
      targetPlayer: enemy?.player,
      attackId: indexes[1] + 1,
    };

    this.http
      .post<any>(
        `${url}/atacar`,
        JSON.stringify(body),
        httpOptions
      )
      .subscribe({
        next: () => this.openMessageModal(`Ataque de tipo ${attack.type.toUpperCase()} ha sido enviado satisfactoriamente hacia pokemon ${enemy?.name}!`),
        error: (error) => this.openMessageModal(`Ataque de tipo ${attack.type.toUpperCase()} no pudo ser enviado hacia pokemon ${enemy?.name}!\n ERROR: ${error.error.message}`)
      });
  }

  openAttackModal() {
    this.showAttackModal = true;
  }

  closeAttackModal() {
    this.showAttackModal = false;
  }

  openMessageModal(body: string) {
    this.messageBody = body;
    this.showMessageModal = true;
  }

  closeMessageModal() {
    this.messageBody = '';
    this.showMessageModal = false;
  }

  openEditModal() {
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
  }

  editPokemon(pokemon: Object) {
    this.http
      .put<any>(
        `${url}/iniciar`,
        JSON.stringify(pokemon),
        httpOptions
      )
      .subscribe({
        next: () => this.openMessageModal(`Pokémon ha sido actualizado satisfactoriamente!`),
        error: (error) => this.openMessageModal(`Pokémon no pudo ser actualizado!\n ERROR: ${error.error.message}`)
      });
  }

  openLogsModal() {
    this.openMessageModal(
      'La función de Ver Logs no está implementada actualmente. Próximamente será agregada.'
    );
  }

  getAvailableEnemies() {
    return this.enemies.filter(enemy => {
      enemy.state === 'EN_BATALLA'
    });
  }
}
