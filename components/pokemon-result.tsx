import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Zap } from "lucide-react"
import Image from "next/image"

interface PokemonResultProps {
  pokemon: {
    name: string
    confidence: number
    description: string
    type: string
    stats: {
      hp: number
      attack: number
      defense: number
      speed: number
    }
  }
}

export function PokemonResult({ pokemon }: PokemonResultProps) {
  const confidencePercent = Math.round(pokemon.confidence * 100)

  // Map Pokémon types to colors
  const typeColors: Record<string, string> = {
    Normal: "bg-gray-400",
    Fire: "bg-red-500",
    Water: "bg-blue-500",
    Electric: "bg-yellow-400",
    Grass: "bg-green-500",
    Ice: "bg-blue-200",
    Fighting: "bg-red-700",
    Poison: "bg-purple-500",
    Ground: "bg-yellow-600",
    Flying: "bg-indigo-300",
    Psychic: "bg-pink-500",
    Bug: "bg-green-400",
    Rock: "bg-yellow-700",
    Ghost: "bg-purple-700",
    Dragon: "bg-indigo-600",
    Dark: "bg-gray-700",
    Steel: "bg-gray-500",
    Fairy: "bg-pink-300",
  }

  const typeColor = typeColors[pokemon.type] || "bg-gray-400"

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl sm:text-2xl text-gradient-pokemon">{pokemon.name}</CardTitle>
            <div className="flex items-center mt-1">
              <Badge className={`${typeColor} hover:${typeColor}`}>{pokemon.type}</Badge>
              <div className="ml-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Zap className="h-4 w-4 mr-1" />
                <span>{confidencePercent}% match</span>
              </div>
            </div>
          </div>
          <div className="relative h-16 w-16">
            <Image
              src={`/placeholder.svg?height=64&width=64&text=${pokemon.name}`}
              alt={pokemon.name}
              fill
              className="object-contain"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{pokemon.description}</p>

        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>HP</span>
              <span>{pokemon.stats.hp}/100</span>
            </div>
            <Progress value={pokemon.stats.hp} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Attack</span>
              <span>{pokemon.stats.attack}/100</span>
            </div>
            <Progress value={pokemon.stats.attack} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Defense</span>
              <span>{pokemon.stats.defense}/100</span>
            </div>
            <Progress value={pokemon.stats.defense} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Speed</span>
              <span>{pokemon.stats.speed}/100</span>
            </div>
            <Progress value={pokemon.stats.speed} className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
