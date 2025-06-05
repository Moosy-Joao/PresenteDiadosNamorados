"use client"

import { Heart, Music, Camera } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-rose-100 flex flex-col items-center justify-center p-4">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="mb-4 relative">
          <Heart className="w-16 h-16 text-red-500 mx-auto fill-current" />
          <div className="absolute -top-2 -right-2 text-2xl">✨</div>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Para Meu Amor</h1>
        <p className="text-gray-600 text-lg">Um presente especial para você ❤️</p>
      </div>

      {/* Counter Card */}
      <Card className="mb-6 w-full max-w-sm bg-white/80 backdrop-blur-sm shadow-lg">
        <CardContent className="p-6 text-center">
          <div className="text-5xl font-bold text-red-500 mb-2">320</div>
          <p className="text-gray-600">dias juntos e contando...</p>
        </CardContent>
      </Card>

      {/* Love Message Card */}
      <Card className="mb-8 w-full max-w-sm bg-white/80 backdrop-blur-sm shadow-lg">
        <CardContent className="p-6 text-center">
          <Heart className="w-8 h-8 text-pink-500 mx-auto mb-3 fill-current" />
          <p className="text-gray-700">Você é a razão do meu sorriso todos os dias ❤️</p>
        </CardContent>
      </Card>

      {/* Action Buttons Grid */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
        <Link href="/memorias">
          <Button className="h-20 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 hover:scale-105 w-full">
            <div className="flex flex-col items-center gap-2">
              <Camera className="w-6 h-6" />
              <span>Nossas Memórias</span>
            </div>
          </Button>
        </Link>

        <Link href="/playlist">
          <Button className="h-20 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 hover:scale-105 w-full">
            <div className="flex flex-col items-center gap-2">
              <Music className="w-6 h-6" />
              <span>Nossa Playlist</span>
            </div>
          </Button>
        </Link>

        <Link href="/promessas">
          <Button className="h-20 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 hover:scale-105 w-full">
            <div className="flex flex-col items-center gap-2">
              <Heart className="w-6 h-6 fill-current" />
              <span>Minhas Promessas</span>
            </div>
          </Button>
        </Link>

        <Button
          className="h-20 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 hover:scale-105"
          onClick={() => console.log("Te Amo")}
        >
          <div className="flex flex-col items-center gap-2">
            <Heart className="w-6 h-6 fill-current" />
            <span>Te Amo 💜</span>
          </div>
        </Button>
      </div>

      {/* Floating Hearts Animation */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 animate-bounce delay-1000">
          <Heart className="w-4 h-4 text-pink-300 fill-current opacity-60" />
        </div>
        <div className="absolute top-1/3 right-1/4 animate-bounce delay-2000">
          <Heart className="w-3 h-3 text-red-300 fill-current opacity-40" />
        </div>
        <div className="absolute bottom-1/3 left-1/3 animate-bounce delay-3000">
          <Heart className="w-5 h-5 text-rose-300 fill-current opacity-50" />
        </div>
      </div>
    </div>
  )
}
