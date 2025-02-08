import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { useEffect } from 'react'

interface CarouselImage {
  src: string
  alt: string
  title: string
  description: string
}

interface CarouselProps {
  images: CarouselImage[]
  currentSlide: number
  setCurrentSlide: React.Dispatch<React.SetStateAction<number>>
}

export default function Carousel({ images, currentSlide, setCurrentSlide }: CarouselProps) {
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % images.length)
    }, 5000) 

    return () => clearInterval(timer)
  }, [images.length, setCurrentSlide])

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="lg:mt-0">
      <div className="relative w-full max-w-lg mx-auto">
        <div className="relative overflow-hidden rounded-2xl shadow-2xl aspect-[4/3]">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ 
              width: `${images.length * 100}%`,
              transform: `translateX(-${currentSlide * (100 / images.length)}%)`
            }}
          >
            {images.map((image, index) => (
              <div key={index} className="max-w-lg w-full h-full min-h-[200px] flex-shrink-0 relative">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full min-h-[400px] object-cover"
                />
              </div>
            ))}
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#627eea]/20 hover:bg-[#627eea]/40 text-white p-2 rounded-full transition-colors"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#627eea]/20 hover:bg-[#627eea]/40 text-white p-2 rounded-full transition-colors"
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-[#627eea]' : 'bg-white/50 hover:bg-[#627eea]/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
