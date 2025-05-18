import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { Search } from "lucide-react"

// Mock data for Pokédex entries
const pokemonEntries = [
  {
    id: 25,
    name: "Pikachu",
    type: "Electric",
    captured: true,
    date: "2023-05-15",
  },
  {
    id: 1,
    name: "Bulbasaur",
    type: "Grass",
    captured: true,
    date: "2023-05-10",
  },
  {
    id: 7,
    name: "Squirtle",
    type: "Water",
    captured: true,
    date: "2023-05-12",
  },
  {
    id: 4,
    name: "Charmander",
    type: "Fire",
    captured: false,
    date: null,
  },
  {
    id: 133,
    name: "Eevee",
    type: "Normal",
    captured: false,
    date: null,
  },
]

// Map Pokémon types to colors
const typeColors: Record<string, string> = {
  Normal: "bg-gray-400",
  Fire: "bg-red-500",
  Water: "bg-blue-500",
  Electric: "bg-yellow-400",
  Grass: "bg-green-500",
}

export default function PokedexPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Update the heading with the gradient effect */}
      <h1 className="text-3xl font-bold text-center text-gradient-pokemon mb-8">Your Pokédex</h1>

      <div className="max-w-3xl mx-auto">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input placeholder="Search Pokémon by name or number..." className="pl-10" />
        </div>

        {/* Make the Pokédex grid more responsive */}
        <div className="grid grid-cols-1 gap-3 sm:gap-4">
          {pokemonEntries.map((pokemon) => (
            <Link href={`/pokedex/${pokemon.id}`} key={pokemon.id}>
              <Card
                className={`cursor-pointer transition-all hover:shadow-md ${!pokemon.captured ? "opacity-60 grayscale" : ""}`}
              >
                <CardContent className="p-3 sm:p-4 flex items-center">
                  <div className="relative h-12 w-12 sm:h-16 sm:w-16 mr-3 sm:mr-4 flex-shrink-0">
                    <Image
                      src={`/placeholder.svg?height=64&width=64&text=${pokemon.name.charAt(0)}`}
                      alt={pokemon.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-sm sm:text-base">{pokemon.name}</h3>
                        <div className="flex items-center mt-1">
                          <Badge
                            className={`${typeColors[pokemon.type] || "bg-gray-400"} hover:${typeColors[pokemon.type] || "bg-gray-400"} text-xs`}
                          >
                            {pokemon.type}
                          </Badge>
                          <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                            #{pokemon.id.toString().padStart(3, "0")}
                          </span>
                        </div>
                      </div>
                      <div className="text-right text-xs text-gray-500 dark:text-gray-400">
                        {pokemon.captured ? (
                          <>
                            <span className="block">Captured</span>
                            <span>{pokemon.date}</span>
                          </>
                        ) : (
                          <span>Not captured</span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
