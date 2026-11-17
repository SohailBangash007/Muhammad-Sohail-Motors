import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let registered = false

export function prefersReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function canHover() {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches
}

export function registerGsap() {
  if (registered || typeof window === 'undefined') return
  gsap.registerPlugin(ScrollTrigger)
  gsap.defaults({ ease: 'power3.out', duration: 0.8 })
  registered = true
}

export { gsap, ScrollTrigger }
