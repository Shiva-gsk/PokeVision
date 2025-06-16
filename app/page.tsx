import type React from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Camera, Trophy, User } from "lucide-react"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 ">
      {/* Hero Section */}
      <section className="py-12 md:py-20 flex flex-col items-center text-center">
        <div className="relative w-24 h-24 mb-6">
          <Image
            src="/HeroImg.png"
            alt="PokéVision Logo"
            fill
            className="object-contain "
            priority
          />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-gradient mb-4">PokéVision</h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl">
          The AI-Powered Pokédex that identifies Pokémon from your real-world images
        </p>
        <Link href="/capture">
          <Button size="lg" className="bg-red-600 hover:bg-red-700">
            Start Capturing <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-8 sm:py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
        <FeatureCard
          icon={<Camera className="h-10 w-10 text-red-600" />}
          title="Image Capture"
          description="Snap photos directly in the app to identify Pokémon in the wild."
        />
        <FeatureCard
          icon={<div className="h-10 w-10 flex items-center justify-center text-2xl">🤖</div>}
          title="AI Recognition"
          description="Advanced machine learning identifies and describes Pokémon from your images."
        />
        <FeatureCard
          icon={<Trophy className="h-10 w-10 text-yellow-500" />}
          title="Leaderboard"
          description="See who has caught the most Pokémon globally and compete with friends."
        />
        <FeatureCard
          icon={<User className="h-10 w-10 text-blue-500" />}
          title="Profile Pages"
          description="Track your caught Pokémon, badges, and achievements."
        />
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 flex flex-col items-center text-center bg-gray-100 dark:bg-gray-800 rounded-xl p-8 mt-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-6">Ready to Become a PokéMaster?</h2>
        <p className="text-lg mb-8 max-w-2xl">
          Whether you're a casual fan or a dedicated trainer, PokéVision brings the Pokédex to life with cutting-edge AI
          technology.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/capture">
            <Button size="lg" className="bg-red-600 hover:bg-red-700">
              Capture Pokémon
            </Button>
          </Link>
          <Link href="/pokedex">
            <Button size="lg" variant="outline">
              View Pokédex
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 flex flex-col items-center text-center h-full">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg sm:text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">{description}</p>
    </div>
  )
}
