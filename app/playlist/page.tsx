"use client"

import { useState, useRef, useEffect } from "react"
import { ArrowLeft, Play, Pause, Music, SkipBack, SkipForward, Volume2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import Link from "next/link"

interface Song {
  id: number
  title: string
  artist: string
  duration: string
  audioPath: string // ADICIONE AQUI O CAMINHO DO SEU ARQUIVO MP3
}

// 🎵 ADICIONE OS CAMINHOS DOS SEUS ARQUIVOS MP3 AQUI:
const playlist: Song[] = [
  {
    id: 1,
    title: "Maria",
    artist: "Matuê",
    duration: "3:45",
    audioPath: "/music/maria-matue.mp3", // ← SUBSTITUA PELO CAMINHO DO SEU ARQUIVO
  },
  {
    id: 2,
    title: "Frio na Barriga",
    artist: "Kraw",
    duration: "4:12",
    audioPath: "/music/frio-na-barriga-kraw.mp3", // ← SUBSTITUA PELO CAMINHO DO SEU ARQUIVO
  },
  {
    id: 3,
    title: "Cold Heart",
    artist: "Elton John & Dua Lipa",
    duration: "3:22",
    audioPath: "/music/cold-heart-elton-dua.mp3", // ← SUBSTITUA PELO CAMINHO DO SEU ARQUIVO
  },
  {
    id: 4,
    title: "ILY",
    artist: "Surf Mesa feat. Emilee",
    duration: "2:58",
    audioPath: "/music/ily-surf-mesa.mp3", // ← SUBSTITUA PELO CAMINHO DO SEU ARQUIVO
  },
  {
    id: 5,
    title: "Beautiful Things",
    artist: "Benson Boone",
    duration: "3:08",
    audioPath: "/music/beautiful-things-benson.mp3", // ← SUBSTITUA PELO CAMINHO DO SEU ARQUIVO
  },
]

export default function PlaylistPage() {
  const [currentSong, setCurrentSong] = useState<Song | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState([80])
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)
    const handleEnded = () => {
      setIsPlaying(false)
      playNext()
    }

    audio.addEventListener("timeupdate", updateTime)
    audio.addEventListener("loadedmetadata", updateDuration)
    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("timeupdate", updateTime)
      audio.removeEventListener("loadedmetadata", updateDuration)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [currentSong])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume[0] / 100
    }
  }, [volume])

  const playSong = (song: Song) => {
    if (currentSong?.id === song.id) {
      togglePlayPause()
    } else {
      setCurrentSong(song)
      setIsPlaying(true)
    }
  }

  const togglePlayPause = () => {
    if (!audioRef.current || !currentSong) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const playNext = () => {
    if (!currentSong) return
    const currentIndex = playlist.findIndex((song) => song.id === currentSong.id)
    const nextIndex = (currentIndex + 1) % playlist.length
    setCurrentSong(playlist[nextIndex])
    setIsPlaying(true)
  }

  const playPrevious = () => {
    if (!currentSong) return
    const currentIndex = playlist.findIndex((song) => song.id === currentSong.id)
    const prevIndex = currentIndex === 0 ? playlist.length - 1 : currentIndex - 1
    setCurrentSong(playlist[prevIndex])
    setIsPlaying(true)
  }

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0]
      setCurrentTime(value[0])
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
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
        <h1 className="text-3xl font-bold text-gray-800">Nossa Playlist</h1>
        <div className="w-20"></div>
      </div>

      {/* Main Music Card */}
      <div className="max-w-2xl mx-auto mb-8">
        <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
          <CardContent className="p-8 text-center">
            <Music className="w-16 h-16 text-pink-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Músicas do Nosso Amor</h2>
            <p className="text-gray-600">Nossas músicas favoritas</p>
          </CardContent>
        </Card>
      </div>

      {/* Playlist */}
      <div className="max-w-2xl mx-auto space-y-4 mb-8">
        {playlist.map((song) => (
          <Card
            key={song.id}
            className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-[1.02]"
            onClick={() => playSong(song)}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <Button
                  size="icon"
                  className={`flex-shrink-0 rounded-full ${
                    currentSong?.id === song.id && isPlaying
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-pink-500 hover:bg-pink-600"
                  } text-white`}
                >
                  {currentSong?.id === song.id && isPlaying ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4 ml-0.5" />
                  )}
                </Button>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{song.title}</h3>
                  <p className="text-sm text-gray-600">{song.artist}</p>
                </div>
                <span className="text-sm text-gray-500">{song.duration}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Music Player */}
      {currentSong && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t shadow-lg">
          <div className="max-w-2xl mx-auto p-4">
            {/* Progress Bar */}
            <div className="mb-4">
              <Slider
                value={[currentTime]}
                max={duration || 100}
                step={1}
                onValueChange={handleSeek}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Player Controls */}
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800">{currentSong.title}</h4>
                <p className="text-sm text-gray-600">{currentSong.artist}</p>
              </div>

              <div className="flex items-center gap-2">
                <Button size="icon" variant="ghost" onClick={playPrevious}>
                  <SkipBack className="w-5 h-5" />
                </Button>
                <Button size="icon" onClick={togglePlayPause} className="bg-pink-500 hover:bg-pink-600 text-white">
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                </Button>
                <Button size="icon" variant="ghost" onClick={playNext}>
                  <SkipForward className="w-5 h-5" />
                </Button>
              </div>

              <div className="flex items-center gap-2 flex-1 justify-end">
                <Volume2 className="w-4 h-4 text-gray-600" />
                <Slider value={volume} max={100} step={1} onValueChange={setVolume} className="w-20" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Audio Element */}
      {currentSong && (
        <audio
          ref={audioRef}
          src={currentSong.audioPath}
          autoPlay={isPlaying}
          onError={(e) => console.error("Erro ao carregar áudio:", e)}
        />
      )}
    </div>
  )
}
