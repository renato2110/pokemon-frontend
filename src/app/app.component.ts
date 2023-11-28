import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Pokemon, PokemonAttack, PokemonType } from './common/models';

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
  id: number = 0;
  name: string = 'Sin nombre';
  life: number = 0;
  type: PokemonType = PokemonType.Normal;
  status: string = 'desconectado';
  attacks: PokemonAttack[] = [];
  advantage: string = '';
  disadvantage: string = '';
  showAttackModal: boolean = false;
  showMessageModal: boolean = false;
  messageBody: string = 'Message';
  showEditModal: boolean = false;

  enemies: Pokemon[] = [];

  ngOnInit() {
    this.refreshData();
    setInterval(() => {
      this.refreshData();
    }, 3000);
  }

  constructor(private http: HttpClient) {}

  refreshData() {
    this.http
      .get<any>('http://localhost:3000/pokemon/info', httpOptions)
      .subscribe({
        next: (response) => {
          this.name = response.data.name;
          this.life = response.data.life;
          this.type = response.data.type;
          this.id = response.data.id;
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

          this.status = response.data.status;
          this.attacks = response.data.attacks;

          this.http
            .get<any>('http://localhost:3000/pokemon/enemigos', httpOptions)
            .subscribe((response) => {
              this.enemies = response.data;
            });
        },
        error: () => {
          this.id = 0;
          this.name = 'Sin nombre';
          this.life = 0;
          this.type = PokemonType.Normal;
          this.status = 'desconectado';
          this.attacks = [];
          this.advantage = '';
          this.disadvantage = '';
          this.enemies = [];

          this.closeAttackModal();
          this.closeEditModal();
        },
      });
  }

  joinMatch() {
    this.http
      .post<any>(
        'http://localhost:3000/pokemon/unirse-a-partida',
        httpOptions
      )
      .subscribe({
        next: () => this.openMessageModal(`Pokémon agregado a la batalla satisfactoriamente!`),
        error: (error) => this.openMessageModal(`Pokémon no pudo ser agregado a la batalla!\n ERROR: ${error.error.message}`)
      });
  }

  handleAttack(indexes: number[]) {
    const enemy = this.enemies.find((enemy) => enemy.id === indexes[0]);
    const attack = this.attacks[indexes[1]];

    const body = {
      pokemonId: enemy?.id,
      attackId: indexes[1] + 1,
    };

    this.http
      .post<any>(
        'http://localhost:3000/pokemon/atacar',
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
        'http://localhost:3000/pokemon/iniciar',
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
}
