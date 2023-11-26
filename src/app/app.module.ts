import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TypeComponent } from './components/type/type.component';
import { AttacksComponent } from './components/attacks/attacks.component';
import { EnemiesComponent } from './components/enemies/enemies.component';
import { EnemyAttackModalComponent } from './components/enemy-attack-modal/enemy-attack-modal.component';
import { FormsModule } from '@angular/forms';
import { MessageModalComponent } from './components/message-modal/message-modal.component';
import { PokemonFormModalComponent } from './components/pokemon-form-modal/pokemon-form-modal.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TypeComponent,
    AttacksComponent,
    EnemiesComponent,
    EnemyAttackModalComponent,
    MessageModalComponent,
    PokemonFormModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
