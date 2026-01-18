import { motion } from "framer-motion";
import { Suspense, lazy } from "react";
import { Link } from "react-router";
import { OGMeta } from "@/components/OGMeta";

// Lazy load PokemonGo to avoid SSR issues with Leaflet
const PokemonGo = lazy(() =>
  import("@/components/crafts/Pokemon").then((mod) => ({ default: mod.PokemonGo }))
);

export default function CraftsPokemon() {
  return (
    <>
      <OGMeta
        title="Pokemon Go Clone - Interactive Craft"
        description="A Pokemon Go clone built with React, Leaflet, and Geolocation API. Catch Pokemon near your location!"
        path="/crafts/pokemon"
      />

      <div className="bg-background min-h-screen">
        <div className="container mx-auto px-4 pt-28 md:pt-36 pb-24">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center mb-12"
          >
            <Link
              to="/work"
              className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Work
            </Link>

            <h1 className="text-4xl md:text-5xl font-serif font-medium mb-6 gradient-text">
              Pokemon Go Clone
            </h1>

            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              An interactive Pokemon catching game using the Geolocation Web API,
              Leaflet for mapping, and React for the UI. Click on nearby Pokemon to catch them!
            </p>

            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {["React", "Leaflet", "Geolocation API", "PokeAPI", "TypeScript"].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Pokemon Game */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <Suspense
              fallback={
                <div className="w-full h-[500px] rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent mx-auto mb-4" />
                    <p className="text-muted-foreground">Loading Pokemon Game...</p>
                  </div>
                </div>
              }
            >
              <PokemonGo />
            </Suspense>
          </motion.div>

          {/* How to Play */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-2xl mx-auto mt-12"
          >
            <h2 className="text-2xl font-semibold mb-6 text-center">How to Play</h2>
            <div className="grid gap-4">
              <div className="bg-card rounded-xl p-4 border border-border">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </span>
                  <div>
                    <h3 className="font-medium text-foreground">Allow Location Access</h3>
                    <p className="text-muted-foreground text-sm">
                      The game needs your location to place you on the map and generate nearby Pokemon.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-xl p-4 border border-border">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </span>
                  <div>
                    <h3 className="font-medium text-foreground">Find Pokemon</h3>
                    <p className="text-muted-foreground text-sm">
                      Pokemon will appear randomly within 100 meters of your location. Look for them on the map!
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-xl p-4 border border-border">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </span>
                  <div>
                    <h3 className="font-medium text-foreground">Catch Them!</h3>
                    <p className="text-muted-foreground text-sm">
                      Click on a Pokemon marker to attempt catching it. Adjust your throw power for better odds!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Technical Details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="max-w-2xl mx-auto mt-12 text-center"
          >
            <h2 className="text-2xl font-semibold mb-4">Technical Highlights</h2>
            <ul className="text-muted-foreground space-y-2 text-left">
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Geolocation API with real-time position tracking
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Haversine formula for accurate distance calculations
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                PokeAPI integration for random Pokemon data
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                State management with Nanostores for reactive updates
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Accessible UI with proper ARIA labels and keyboard support
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export function meta() {
  return [
    { title: "Pokemon Go Clone - sarbeh crafts" },
    { name: "description", content: "A Pokemon Go clone built with React, Leaflet, and Geolocation API" },
  ];
}
