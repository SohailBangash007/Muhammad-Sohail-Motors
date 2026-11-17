import { useRef } from 'react'
import { Heart } from 'lucide-react'
import { gsap, prefersReducedMotion } from '../lib/animations.js'
import { useSavedCars } from '../lib/savedCars.js'

function SaveButton({ carId, carName, className = '' }) {
  const { isSaved, toggleSavedCar } = useSavedCars()
  const buttonRef = useRef(null)
  const active = isSaved(carId)

  function handleClick() {
    toggleSavedCar(carId)
    if (!prefersReducedMotion() && buttonRef.current) {
      gsap.fromTo(buttonRef.current, { scale: 0.78 }, { scale: 1, duration: 0.5, ease: 'back.out(3)', overwrite: true })
    }
  }

  return (
    <button
      aria-label={active ? `Remove ${carName} from saved cars` : `Save ${carName}`}
      aria-pressed={active}
      className={`save-btn ${className}`}
      onClick={handleClick}
      ref={buttonRef}
      type="button"
    >
      <Heart fill={active ? 'currentColor' : 'none'} size={16} />
    </button>
  )
}

export default SaveButton
