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
  audioPath: string
}

const playlist: Song[] = [
  {
    id: 1,
    title: "Maria",
    artist: "Matuê",
    duration: "3:45",
    audioPath: "/music/Matue-Maria.mp3",
  },
  {
    id: 2,
    title: "Frio na Barriga",
    artist: "Kraw",
    duration: "4:12",
    audioPath: "/music/Krawk-Frio-na-Barriga.mp3",
  },
  {
    id: 3,
    title: "Cold Heart",
    artist: "Elton John & Dua Lipa",
    duration: "3:22",
    audioPath: "/music/Elton-John-Dua-Lipa-Cold-Heart.mp3",
  },
  {
    id: 4,
    title: "ILY",
    artist: "Surf Mesa feat. Emilee",
    duration: "2:58",
    audioPath: "/music/Surf-Mesa-ily.mp3",
  },
  {
    id: 5,
    title: "Beautiful Things",
    artist: "Benson Boone",
    duration: "3:08",
    audioPath: "/music/Benson-Boone-Beautiful-Things.mp3",
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
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-rose-100 p-3 sm:p-4">
      {/* Header - Responsivo */}
      <div className="flex items-center justify-between mb-6 sm:mb-8 max-w-2xl mx-auto">
        <Link href="/">
          <Button variant="ghost" className="text-gray-600 hover:text-gray-800 p-2">
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
            <span className="text-sm sm:text-base">Voltar</span>
          </Button>
        </Link>
        <h1 className="text-xl sm:text-3xl font-bold text-gray-800 text-center flex-1 mx-2">Nossa Playlist</h1>
        <div className="w-16 sm:w-20"></div>
      </div>

      {/* Main Music Card - Responsivo */}
      <div className="max-w-2xl mx-auto mb-6 sm:mb-8 px-2 sm:px-0">
        <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
          <CardContent className="p-6 sm:p-8 text-center">
            <Music className="w-12 h-12 sm:w-16 sm:h-16 text-pink-500 mx-auto mb-3 sm:mb-4" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1 sm:mb-2">Músicas do Nosso Amor</h2>
            <p className="text-gray-600 text-sm sm:text-base">Nossas músicas favoritas</p>
          </CardContent>
        </Card>
      </div>

      {/* Playlist - Responsivo com margem maior para mobile */}
      <div className="max-w-2xl mx-auto space-y-3 sm:space-y-4 mb-32 sm:mb-24 px-2 sm:px-0">
        {playlist.map((song) => (
          <Card
            key={song.id}
            className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-[1.02]"
            onClick={() => playSong(song)}
          >
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <Button
                  size="icon"
                  className={`flex-shrink-0 rounded-full w-10 h-10 sm:w-12 sm:h-12 ${
                    currentSong?.id === song.id && isPlaying
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-pink-500 hover:bg-pink-600"
                  } text-white`}
                >
                  {currentSong?.id === song.id && isPlaying ? (
                    <Pause className="w-3 h-3 sm:w-4 sm:h-4" />
                  ) : (
                    <Play className="w-3 h-3 sm:w-4 sm:h-4 ml-0.5" />
                  )}
                </Button>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-800 text-sm sm:text-base truncate">{song.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 truncate">{song.artist}</p>
                </div>
                <span className="text-xs sm:text-sm text-gray-500 flex-shrink-0">{song.duration}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Music Player - Otimizado para Mobile */}
      {currentSong && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t shadow-lg">
          <div className="max-w-2xl mx-auto p-3 sm:p-4">
            {/* Progress Bar */}
            <div className="mb-3 sm:mb-4">
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

            {/* Player Controls - Layout Mobile Otimizado */}
            <div className="flex items-center justify-between">
              {/* Song Info - Com truncate para mobile */}
              <div className="flex-1 min-w-0 mr-3">
                <h4 className="font-semibold text-gray-800 text-sm sm:text-base truncate">{currentSong.title}</h4>
                <p className="text-xs sm:text-sm text-gray-600 truncate">{currentSong.artist}</p>
              </div>

              {/* Control Buttons - Tamanhos otimizados */}
              <div className="flex items-center gap-1 sm:gap-2">
                <Button size="icon" variant="ghost" onClick={playPrevious} className="w-8 h-8 sm:w-10 sm:h-10">
                  <SkipBack className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
                <Button
                  size="icon"
                  onClick={togglePlayPause}
                  className="bg-pink-500 hover:bg-pink-600 text-white w-10 h-10 sm:w-12 sm:h-12"
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <Play className="w-4 h-4 sm:w-5 sm:h-5 ml-0.5" />
                  )}
                </Button>
                <Button size="icon" variant="ghost" onClick={playNext} className="w-8 h-8 sm:w-10 sm:h-10">
                  <SkipForward className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </div>

              {/* Volume Control - Oculto em telas muito pequenas */}
              <div className="hidden sm:flex items-center gap-2 flex-1 justify-end ml-3">
                <Volume2 className="w-4 h-4 text-gray-600" />
                <Slider value={volume} max={100} step={1} onValueChange={setVolume} className="w-16 sm:w-20" />
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
