import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, Medal } from "lucide-react"

// Mock data for leaderboard
const globalLeaders = [
  {
    id: 1,
    username: "AshKetchum",
    avatar: null,
    captured: 142,
    rare: 15,
    badges: 8,
    region: "Kanto",
  },
  {
    id: 2,
    username: "PokeMaster99",
    avatar: null,
    captured: 137,
    rare: 12,
    badges: 7,
    region: "Johto",
  },
  {
    id: 3,
    username: "MistyWater",
    avatar: null,
    captured: 128,
    rare: 10,
    badges: 6,
    region: "Hoenn",
  },
  {
    id: 4,
    username: "BrockRock",
    avatar: null,
    captured: 115,
    rare: 8,
    badges: 5,
    region: "Sinnoh",
  },
  {
    id: 5,
    username: "TeamRocket",
    avatar: null,
    captured: 98,
    rare: 9,
    badges: 3,
    region: "Unova",
  },
]

const friendLeaders = [
  {
    id: 101,
    username: "GaryOak",
    avatar: null,
    captured: 89,
    rare: 7,
    badges: 6,
    region: "Kanto",
  },
  {
    id: 102,
    username: "BrockRock",
    avatar: null,
    captured: 76,
    rare: 5,
    badges: 4,
    region: "Kanto",
  },
  {
    id: 103,
    username: "MistyWater",
    avatar: null,
    captured: 72,
    rare: 4,
    badges: 3,
    region: "Kanto",
  },
]

export default function LeaderboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Update the heading with the gradient effect */}
      <h1 className="text-3xl font-bold text-center text-gradient-pokemon mb-8">Leaderboard</h1>

      <div className="max-w-3xl mx-auto">
        <Tabs defaultValue="global">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="global">Global</TabsTrigger>
            <TabsTrigger value="friends">Friends</TabsTrigger>
          </TabsList>

          <TabsContent value="global">
            <LeaderboardList leaders={globalLeaders} />
          </TabsContent>

          <TabsContent value="friends">
            <LeaderboardList leaders={friendLeaders} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

// Make the leaderboard cards more responsive
function LeaderboardList({ leaders }: { leaders: any[] }) {
  return (
    <div className="space-y-3 sm:space-y-4">
      {leaders.map((leader, index) => (
        <Card key={leader.id} className={index < 3 ? "border-2 border-yellow-400" : ""}>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0 w-8 sm:w-10 text-center">
                {index === 0 ? (
                  <Trophy className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-500 mx-auto" />
                ) : index === 1 ? (
                  <Medal className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 mx-auto" />
                ) : index === 2 ? (
                  <Medal className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600 mx-auto" />
                ) : (
                  <span className="text-base sm:text-lg font-bold text-gray-500">{index + 1}</span>
                )}
              </div>

              <Avatar className="h-8 w-8 sm:h-10 sm:w-10 ml-2 sm:ml-3">
                <AvatarImage src={leader.avatar || ""} alt={leader.username} />
                <AvatarFallback>{leader.username.substring(0, 2)}</AvatarFallback>
              </Avatar>

              <div className="ml-3 sm:ml-4 flex-1">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <div>
                    <h3 className="font-medium text-sm sm:text-base">{leader.username}</h3>
                    <span className="text-xs text-gray-500">{leader.region}</span>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-4 mt-1 sm:mt-0">
                    <div className="text-center">
                      <span className="block text-base sm:text-lg font-bold">{leader.captured}</span>
                      <span className="text-xs text-gray-500">Captured</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-base sm:text-lg font-bold">{leader.rare}</span>
                      <span className="text-xs text-gray-500">Rare</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-base sm:text-lg font-bold">{leader.badges}</span>
                      <span className="text-xs text-gray-500">Badges</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
