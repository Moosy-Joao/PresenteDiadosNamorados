"use client"

import { useState } from "react"
import { ArrowLeft, X } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import Link from "next/link"
import Image from "next/image"

interface Memory {
  id: string
  title: string
  description: string
  image?: string
  video?: string
  type: "image" | "video"
}

const memories: Memory[] = [
  {
    id: "1",
    title: "Nosso Primeiro Encontro",
    description: "O dia que mudou tudo",
    image: "/images/primeiro-encontro.jpg",
    type: "image",
  },
  {
    id: "2",
    title: "Nossa Primeira Viagem",
    description: "Aventuras juntos",
    image: "/images/primeira-viagem.jpg",
    type: "image",
  },
  {
    id: "3",
    title: "Momentos Especiais",
    description: "Nosso primeiro show juntos",
    image: "/images/primeiro-show.jpg",
    type: "image",
  },
  {
    id: "4",
    title: "Nossos Sonhos",
    description: "Planejando o futuro juntos",
    video: "/videos/nossos-sonhos.mp4",
    type: "video",
  },
]

export default function MemoriasPage() {
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null)

  const openModal = (memory: Memory) => {
    setSelectedMemory(memory)
  }

  const closeModal = () => {
    setSelectedMemory(null)
  }

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
        <h1 className="text-3xl font-bold text-gray-800">Nossas Memórias</h1>
        <div className="w-20"></div> {/* Spacer for centering */}
      </div>

      {/* Memories Grid */}
      <div className="max-w-2xl mx-auto space-y-6">
        {memories.map((memory) => (
          <Card
            key={memory.id}
            className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-[1.02]"
            onClick={() => openModal(memory)}
          >
            <CardContent className="p-0">
              <div className="flex flex-col">
                {/* Media Container */}
                <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                  {memory.type === "image" && memory.image ? (
                    <Image
                      src={memory.image || "/placeholder.svg"}
                      alt={memory.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                  ) : memory.type === "video" && memory.video ? (
                    <video
                      className="w-full h-full object-cover"
                      poster="/placeholder.svg?height=192&width=400"
                      preload="metadata"
                      muted
                    >
                      <source src={memory.video} type="video/mp4" />
                      Seu navegador não suporta vídeos.
                    </video>
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">Sem mídia</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{memory.title}</h3>
                  <p className="text-gray-600 text-sm">{memory.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal for expanded view */}
      <Dialog open={!!selectedMemory} onOpenChange={closeModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden">
          {selectedMemory && (
            <div className="relative">
              {/* Close button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-10 bg-black/20 hover:bg-black/40 text-white rounded-full"
                onClick={closeModal}
              >
                <X className="w-5 h-5" />
              </Button>

              {/* Media */}
              <div className="relative">
                {selectedMemory.type === "image" && selectedMemory.image ? (
                  <div className="relative w-full h-[60vh]">
                    <Image
                      src={selectedMemory.image || "/placeholder.svg"}
                      alt={selectedMemory.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : selectedMemory.type === "video" && selectedMemory.video ? (
                  <div className="relative w-full">
                    <video className="w-full max-h-[60vh] rounded-t-lg" controls preload="metadata">
                      <source src={selectedMemory.video} type="video/mp4" />
                      Seu navegador não suporta vídeos.
                    </video>
                  </div>
                ) : null}
              </div>

              {/* Content */}
              <div className="p-6 bg-white">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedMemory.title}</h2>
                <p className="text-gray-600">{selectedMemory.description}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
