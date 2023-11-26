export interface Pokemon {
    id: number,
    name: string;
    type: PokemonType;
    life: number;
    attacks?: PokemonAttack[];
}

export interface PokemonAttack {
    type: PokemonType;
    power: number;
}

export enum PokemonType {
    Fire = 'fuego',
    Grass = 'planta',
    Normal = 'normal',
    Water = 'agua'
}