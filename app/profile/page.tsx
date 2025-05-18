import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import Link from "next/link"
import { Camera, MapPin, Trophy, User } from "lucide-react"

// Mock user data
const user = {
  username: "AshKetchum",
  avatar: null,
  region: "Kanto",
  joinedDate: "May 2023",
  stats: {
    captured: 42,
    totalPokemon: 151,
    badges: 8,
    rare: 5,
  },
}

// Mock badges data
const badges = [
  { id: 1, name: "Boulder Badge", obtained: true, date: "May 15, 2023" },
  { id: 2, name: "Cascade Badge", obtained: true, date: "May 20, 2023" },
  { id: 3, name: "Thunder Badge", obtained: true, date: "May 25, 2023" },
  { id: 4, name: "Rainbow Badge", obtained: true, date: "June 1, 2023" },
  { id: 5, name: "Soul Badge", obtained: true, date: "June 10, 2023" },
  { id: 6, name: "Marsh Badge", obtained: true, date: "June 15, 2023" },
  { id: 7, name: "Volcano Badge", obtained: true, date: "June 20, 2023" },
  { id: 8, name: "Earth Badge", obtained: true, date: "June 25, 2023" },
]

// Mock recent captures
const recentCaptures = [
  { id: 25, name: "Pikachu", type: "Electric", date: "2 days ago" },
  { id: 1, name: "Bulbasaur", type: "Grass", date: "5 days ago" },
  { id: 7, name: "Squirtle", type: "Water", date: "1 week ago" },
]

// Map Pokémon types to colors
const typeColors: Record<string, string> = {
  Normal: "bg-gray-400",
  Fire: "bg-red-500",
  Water: "bg-blue-500",
  Electric: "bg-yellow-400",
  Grass: "bg-green-500",
}

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <Card className="mb-4 sm:mb-6">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 sm:gap-6">
              <Avatar className="h-20 w-20 sm:h-24 sm:w-24">
                <AvatarImage src={user.avatar || ""} alt={user.username} />
                <AvatarFallback className="text-xl sm:text-2xl">{user.username.substring(0, 2)}</AvatarFallback>
              </Avatar>

              <div className="flex-1 text-center md:text-left">
                <h1 className="text-xl sm:text-2xl font-bold text-gradient-pokemon">{user.username}</h1>
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-2">
                  <Badge variant="outline" className="flex items-center gap-1 text-xs">
                    <MapPin className="h-3 w-3" />
                    {user.region}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1 text-xs">
                    <User className="h-3 w-3" />
                    Joined {user.joinedDate}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 mt-4 sm:mt-6">
                  <StatCard
                    icon={<Camera className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />}
                    value={user.stats.captured}
                    label="Captured"
                  />
                  <StatCard
                    icon={<div className="text-base sm:text-lg">📊</div>}
                    value={`${Math.round((user.stats.captured / user.stats.totalPokemon) * 100)}%`}
                    label="Completion"
                  />
                  <StatCard
                    icon={<Trophy className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />}
                    value={user.stats.badges}
                    label="Badges"
                  />
                  <StatCard
                    icon={<div className="text-base sm:text-lg">⭐</div>}
                    value={user.stats.rare}
                    label="Rare Finds"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress Bar */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold">Pokédex Completion</h2>
              <span className="text-sm text-gray-500">
                {user.stats.captured} of {user.stats.totalPokemon}
              </span>
            </div>
            <Progress value={(user.stats.captured / user.stats.totalPokemon) * 100} className="h-2" />
          </CardContent>
        </Card>

        {/* Tabs for Badges and Recent Captures */}
        <Tabs defaultValue="badges">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="badges">Badges</TabsTrigger>
            <TabsTrigger value="recent">Recent Captures</TabsTrigger>
          </TabsList>

          <TabsContent value="badges">
            <Card>
              <CardHeader>
                <CardTitle>Gym Badges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {badges.map((badge) => (
                    <div
                      key={badge.id}
                      className={`p-4 border rounded-lg text-center ${badge.obtained ? "" : "opacity-50 grayscale"}`}
                    >
                      <div className="relative h-12 w-12 mx-auto mb-2">
                        <Image
                          src={`/placeholder.svg?height=48&width=48&text=🏅`}
                          alt={badge.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <h3 className="font-medium text-sm">{badge.name}</h3>
                      {badge.obtained && <p className="text-xs text-gray-500 mt-1">{badge.date}</p>}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recent">
            <Card>
              <CardHeader>
                <CardTitle>Recent Captures</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentCaptures.map((pokemon) => (
                    <Link href={`/pokedex/${pokemon.id}`} key={pokemon.id}>
                      <div className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                        <div className="relative h-12 w-12 mr-4 flex-shrink-0">
                          <Image
                            src={`/placeholder.svg?height=48&width=48&text=${pokemon.name.charAt(0)}`}
                            alt={pokemon.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-medium">{pokemon.name}</h3>
                              <Badge
                                className={`${typeColors[pokemon.type] || "bg-gray-400"} hover:${typeColors[pokemon.type] || "bg-gray-400"} mt-1`}
                              >
                                {pokemon.type}
                              </Badge>
                            </div>
                            <div className="text-sm text-gray-500 self-center">{pokemon.date}</div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function StatCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode
  value: number | string
  label: string
}) {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-2 sm:p-3 rounded-lg text-center">
      <div className="flex justify-center mb-1">{icon}</div>
      <div className="text-lg sm:text-xl font-bold">{value}</div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  )
}
