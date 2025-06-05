"use client"

import { ArrowLeft, Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const promessas = [
  "Sempre te apoiar em seus sonhos",
  "Fazer você rir todos os dias",
  "Ser seu melhor amigo e companheiro",
  "Criar memórias incríveis juntos",
  "Te amar mais a cada dia que passa",
]

export default function PromessasPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-rose-100 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 max-w-2xl mx-auto">
        <Link href="/">
          <Button variant="ghost" className="text-gray-600 hover:text-gray-800">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-gray-800">Minhas Promessas</h1>
        <div className="w-20"></div> {/* Spacer for centering */}
      </div>

      {/* Main Promise Card */}
      <div className="max-w-2xl mx-auto mb-8">
        <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
          <CardContent className="p-8 text-center">
            <Heart className="w-16 h-16 text-red-500 mx-auto mb-4 fill-current" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Para Você, Meu Amor</h2>
            <p className="text-gray-600">Promessas que faço de coração</p>
          </CardContent>
        </Card>
      </div>

      {/* Promises List */}
      <div className="max-w-2xl mx-auto space-y-4">
        {promessas.map((promessa, index) => (
          <Card
            key={index}
            className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <Heart className="w-6 h-6 text-red-500 fill-current" />
                </div>
                <p className="text-gray-700 text-lg">{promessa}</p>
              </div>
            </CardContent>
          </Card>
        ))}
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
        <div className="absolute top-1/2 right-1/3 animate-bounce delay-4000">
          <Heart className="w-4 h-4 text-rose-400 fill-current opacity-50" />
        </div>
      </div>
    </div>
  )
}
