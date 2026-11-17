import { useSyncExternalStore } from 'react'

const STORAGE_KEY = 'sohail:saved-cars'
const EMPTY = []
const listeners = new Set()
let cache = null

function readSnapshot() {
  if (cache) return cache
  if (typeof window === 'undefined') return EMPTY
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY))
    cache = Array.isArray(parsed) ? parsed : EMPTY
  } catch {
    cache = EMPTY
  }
  return cache
}

function subscribe(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function toggleSavedCar(id) {
  const saved = readSnapshot()
  cache = saved.includes(id) ? saved.filter((item) => item !== id) : [...saved, id]
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cache))
  } catch {
    // Storage can be unavailable in private mode — the in-memory state still works.
  }
  listeners.forEach((listener) => listener())
}

export function useSavedCars() {
  const saved = useSyncExternalStore(subscribe, readSnapshot, () => EMPTY)
  return {
    saved,
    isSaved: (id) => saved.includes(id),
    toggleSavedCar,
  }
}
