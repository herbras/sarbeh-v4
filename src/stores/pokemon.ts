import { atom, map } from "nanostores";

export interface Pokemon {
  id: string;
  pokemon: string;
  imageUrl: string;
  lat: number;
  lon: number;
}

export interface Position {
  latitude: number;
  longitude: number;
}

export const $position = atom<Position>({ latitude: 0, longitude: 0 });
export const $nearbyPokemons = atom<Pokemon[]>([]);
export const $inventory = atom<Pokemon[]>([]);

export const $mapState = map({
  position: { latitude: 0, longitude: 0 } as Position,
  nearbyPokemons: [] as Pokemon[],
  inventory: [] as Pokemon[],
});

export function updatePosition(newPosition: Position) {
  $position.set(newPosition);
  $mapState.setKey("position", newPosition);
}

export function updateNearbyPokemons(pokemons: Omit<Pokemon, 'id'>[]) {
  const pokemonsWithIds = pokemons.map((pokemon, index) => ({
    ...pokemon,
    id: `pokemon-${index}-${Date.now()}`
  }));
  $nearbyPokemons.set(pokemonsWithIds);
  $mapState.setKey("nearbyPokemons", pokemonsWithIds);
}

export function catchPokemon(pokemon: Pokemon) {
  const currentInventory = $inventory.get();
  const updatedInventory = [...currentInventory, pokemon];
  $inventory.set(updatedInventory);
  $mapState.setKey("inventory", updatedInventory);

  // Remove caught Pokemon from nearby list
  const currentNearby = $nearbyPokemons.get();
  const updatedNearby = currentNearby.filter((p) => p.id !== pokemon.id);
  $nearbyPokemons.set(updatedNearby);
  $mapState.setKey("nearbyPokemons", updatedNearby);
}

// Haversine formula for distance calculation
export function getDistanceBetween(pos1: Position, pos2: Position): number {
  const R = 6371e3; // Earth's radius in meters
  const phi1 = (pos1.latitude * Math.PI) / 180;
  const phi2 = (pos2.latitude * Math.PI) / 180;
  const deltaPhi = ((pos2.latitude - pos1.latitude) * Math.PI) / 180;
  const deltaLambda = ((pos2.longitude - pos1.longitude) * Math.PI) / 180;

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

// Generate random coordinate within radius (in meters)
export function getRandomCoordinate(position: Position, radius: number): { lat: number; lon: number } {
  const y0 = position.latitude;
  const x0 = position.longitude;
  const rd = radius / 111300; // Convert meters to degrees

  const u = Math.random();
  const v = Math.random();

  const w = rd * Math.sqrt(u);
  const t = 2 * Math.PI * v;
  const x = w * Math.cos(t);
  const y = w * Math.sin(t);

  const xp = x / Math.cos(y0 * Math.PI / 180);

  return {
    lat: y + y0,
    lon: xp + x0,
  };
}

// Fetch random Pokemon from PokeAPI
export async function fetchRandomPokemon(): Promise<{ name: string; imageUrl: string }> {
  const randomId = Math.ceil(Math.random() * 898);
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-form/${randomId}`);
    const data = await response.json();
    return {
      name: data.name,
      imageUrl: data.sprites.front_default || "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
    };
  } catch {
    return {
      name: "pikachu",
      imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
    };
  }
}
