import { useCallback, useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { motion, AnimatePresence } from "framer-motion";
import {
  $position,
  $nearbyPokemons,
  $inventory,
  updatePosition,
  updateNearbyPokemons,
  catchPokemon,
  getDistanceBetween,
  getRandomCoordinate,
  fetchRandomPokemon,
  type Pokemon,
  type Position,
} from "@/stores/pokemon";
import { useStore } from "@/stores/app";
import { PokemonCatchSystem } from "./PokemonCatchSystem";

// Custom user icon
const userIcon = L.icon({
  iconUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
  iconSize: [50, 50],
  iconAnchor: [25, 50],
});

// Create Pokemon icon dynamically
function createPokemonIcon(imageUrl: string) {
  return L.icon({
    iconUrl: imageUrl,
    iconSize: [55, 55],
    iconAnchor: [27, 27],
  });
}

// Map controller component to handle panning
function MapController({ position }: { position: Position }) {
  const map = useMap();

  useEffect(() => {
    if (position.latitude !== 0 && position.longitude !== 0) {
      map.panTo([position.latitude, position.longitude]);
    }
  }, [map, position]);

  return null;
}

export function PokemonGo() {
  const [showPermissionPrompt, setShowPermissionPrompt] = useState(true);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [catchingPokemon, setCatchingPokemon] = useState<Pokemon | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const position = useStore($position);
  const nearbyPokemons = useStore($nearbyPokemons);
  const inventory = useStore($inventory);

  const initialPositionRef = useRef<Position | null>(null);
  const watchIdRef = useRef<number | null>(null);

  const welcomeMessage = {
    title: "Pokemon Go Clone",
    description: "This project showcases geolocation Web API, Leaflet for mapping, and React for reactive UI, with custom algorithms for finding nearby Pokemon. To start your adventure, we need your location permission.",
    buttonText: "Start Catching!",
  };

  const generateNearbyCoordinates = useCallback(async (currentPosition: Position) => {
    setIsLoading(true);
    const newCoordinates: Omit<Pokemon, 'id'>[] = [];

    for (let i = 0; i < 10; i++) {
      const coordinate = getRandomCoordinate(currentPosition, 100);
      const pokemon = await fetchRandomPokemon();
      newCoordinates.push({
        ...coordinate,
        pokemon: pokemon.name,
        imageUrl: pokemon.imageUrl,
      });
    }

    updateNearbyPokemons(newCoordinates);
    setIsLoading(false);
  }, []);

  const initializeGame = useCallback(async (pos: GeolocationPosition) => {
    const newPosition: Position = {
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude,
    };
    updatePosition(newPosition);
    initialPositionRef.current = { ...newPosition };
    await generateNearbyCoordinates(newPosition);
  }, [generateNearbyCoordinates]);

  const watchPosition = useCallback(() => {
    watchIdRef.current = navigator.geolocation.watchPosition(
      async (pos) => {
        const newPosition: Position = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        };
        updatePosition(newPosition);

        if (initialPositionRef.current) {
          const distanceMoved = getDistanceBetween(initialPositionRef.current, newPosition);
          if (distanceMoved > 500) {
            await generateNearbyCoordinates(newPosition);
            initialPositionRef.current = { ...newPosition };
          }
        }
      },
      (error) => {
        console.error(`Geolocation error: ${error.message}`);
      },
      { enableHighAccuracy: true }
    );
  }, [generateNearbyCoordinates]);

  const requestLocationPermission = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by this browser.");
      return;
    }

    try {
      const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
        });
      });

      setPermissionGranted(true);
      setShowPermissionPrompt(false);
      await initializeGame(pos);
      watchPosition();
    } catch (error) {
      alert("Location permission is required to play. Please try again.");
    }
  };

  const handlePokemonClick = (pokemon: Pokemon) => {
    const distance = getDistanceBetween(position, { latitude: pokemon.lat, longitude: pokemon.lon });
    if (distance < 100) {
      setCatchingPokemon(pokemon);
    }
  };

  const handleCatch = (pokemon: Pokemon) => {
    catchPokemon(pokemon);
    setCatchingPokemon(null);
  };

  const handleEscape = () => {
    setCatchingPokemon(null);
  };

  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  if (showPermissionPrompt) {
    return (
      <div className="relative w-full h-[500px] rounded-2xl bg-gradient-to-b from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl max-w-md mx-4 text-center"
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            {welcomeMessage.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            {welcomeMessage.description}
          </p>
          <button
            onClick={requestLocationPermission}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            aria-label="Start catching Pokemon"
          >
            {welcomeMessage.buttonText}
          </button>
        </motion.div>
      </div>
    );
  }

  if (!permissionGranted || position.latitude === 0) {
    return (
      <div className="relative w-full h-[500px] rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="relative w-full h-[500px] rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
      <MapContainer
        center={[position.latitude, position.longitude]}
        zoom={18}
        className="w-full h-full z-0"
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapController position={position} />

        {/* User marker */}
        <Marker position={[position.latitude, position.longitude]} icon={userIcon}>
          <Popup>You are here!</Popup>
        </Marker>

        {/* Pokemon markers */}
        {nearbyPokemons.map((pokemon) => (
          <Marker
            key={pokemon.id}
            position={[pokemon.lat, pokemon.lon]}
            icon={createPokemonIcon(pokemon.imageUrl)}
            eventHandlers={{
              click: () => handlePokemonClick(pokemon),
            }}
          >
            <Popup>
              <div className="text-center">
                <img src={pokemon.imageUrl} alt={pokemon.pokemon} className="w-16 h-16 mx-auto" />
                <p className="font-semibold capitalize mt-2">{pokemon.pokemon}</p>
                <button
                  onClick={() => handlePokemonClick(pokemon)}
                  className="mt-2 bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                >
                  Catch!
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* UI Overlay - Nearby Pokemon List */}
      <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-4 max-w-[200px]">
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
          <h3 className="font-semibold text-gray-800 dark:text-white mb-2 text-sm">
            Nearby Pokemon ({nearbyPokemons.length})
          </h3>
          {isLoading ? (
            <div className="flex justify-center py-2">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-green-500 border-t-transparent" />
            </div>
          ) : (
            <ul className="space-y-2 max-h-[150px] overflow-y-auto" role="list" aria-label="Nearby Pokemon">
              {nearbyPokemons.slice(0, 5).map((pokemon) => (
                <li key={pokemon.id} className="flex items-center gap-2">
                  <img src={pokemon.imageUrl} alt="" className="w-8 h-8" aria-hidden="true" />
                  <span className="text-sm text-gray-700 dark:text-gray-300 capitalize truncate">
                    {pokemon.pokemon}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
          <h3 className="font-semibold text-gray-800 dark:text-white mb-2 text-sm">
            Your Pokemon ({inventory.length})
          </h3>
          <ul className="space-y-2 max-h-[100px] overflow-y-auto" role="list" aria-label="Your caught Pokemon">
            {inventory.length === 0 ? (
              <li className="text-sm text-gray-500 dark:text-gray-400">No Pokemon yet</li>
            ) : (
              inventory.slice(-5).map((pokemon) => (
                <li key={pokemon.id} className="flex items-center gap-2">
                  <img src={pokemon.imageUrl} alt="" className="w-8 h-8" aria-hidden="true" />
                  <span className="text-sm text-gray-700 dark:text-gray-300 capitalize truncate">
                    {pokemon.pokemon}
                  </span>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>

      {/* Catch System Modal */}
      <AnimatePresence>
        {catchingPokemon && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[2000] flex items-center justify-center bg-black/50 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="catch-dialog-title"
          >
            <PokemonCatchSystem
              pokemon={catchingPokemon}
              onCatch={handleCatch}
              onEscape={handleEscape}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
