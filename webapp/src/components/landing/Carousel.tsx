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
  setCurrentSlide: (index: number) => void
}

export default function Carousel({ images, currentSlide, setCurrentSlide }: CarouselProps) {
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((currentSlide + 1) % images.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(timer)
  }, [currentSlide, images.length, setCurrentSlide])

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + images.length) % images.length)
  }

  return (
    <div className="lg:mt-0">
      <div className="relative w-full max-w-lg mx-auto">
        <div className="relative overflow-hidden rounded-2xl shadow-2xl aspect-[4/3]">
          <div 
            className="relative w-full h-full transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            <div className="absolute inset-0 flex">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="relative w-full h-full flex-shrink-0"
                  style={{ left: `${index * 100}%` }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-xl font-semibold mb-2">{image.title}</h3>
                      <p className="text-sm text-gray-200">{image.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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