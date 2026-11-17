import { useEffect } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion, registerGsap } from '../lib/animations.js'

/**
 * Shared page-level GSAP choreography.
 *
 * - [data-hero-word]      staggered hero heading reveal
 * - [data-hero-fade]      soft fade-up for hero supporting copy
 * - [data-hero-bg]        slow zoom-in + fade for the hero photo
 * - [data-parallax-photo] scrubbed parallax drift on background photos
 * - [data-reveal-group]   staggered reveal for children marked [data-reveal-item]
 * - .gsap-reveal          individual fade-up on scroll
 */
export function useGsapPage(rootRef) {
  useEffect(() => {
    const root = rootRef.current
    if (!root || prefersReducedMotion()) return undefined

    registerGsap()

    const context = gsap.context(() => {
      const heroWords = root.querySelectorAll('[data-hero-word]')
      if (heroWords.length) {
        gsap.fromTo(
          heroWords,
          { yPercent: 118, autoAlpha: 0, rotate: 2.5 },
          {
            yPercent: 0,
            autoAlpha: 1,
            rotate: 0,
            duration: 1.15,
            ease: 'power4.out',
            stagger: 0.09,
            delay: 0.18,
          },
        )
      }

      const heroFades = root.querySelectorAll('[data-hero-fade]')
      if (heroFades.length) {
        gsap.fromTo(
          heroFades,
          { y: 26, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.95,
            ease: 'power3.out',
            stagger: 0.1,
            delay: 0.45,
          },
        )
      }

      const heroBg = root.querySelector('[data-hero-bg]')
      if (heroBg) {
        gsap.fromTo(
          heroBg,
          { scale: 1.22, autoAlpha: 0 },
          { scale: 1.1, autoAlpha: 1, duration: 1.9, ease: 'power2.out' },
        )
        gsap.to(heroBg, {
          scale: 1.16,
          yPercent: 7,
          ease: 'none',
          scrollTrigger: {
            trigger: heroBg.parentElement,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6,
          },
        })
      }

      root.querySelectorAll('[data-parallax-photo]').forEach((photo) => {
        const strength = Number(photo.dataset.parallaxPhoto) || 6
        gsap.set(photo, { scale: 1.16 })
        gsap.fromTo(
          photo,
          { yPercent: -strength },
          {
            yPercent: strength,
            ease: 'none',
            scrollTrigger: {
              trigger: photo.parentElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6,
            },
          },
        )
      })

      root.querySelectorAll('[data-split]').forEach((element) => {
        if (element.childElementCount > 0) return
        const words = element.textContent.trim().split(/\s+/)
        if (!words.length) return

        element.textContent = ''
        const inners = words.map((word) => {
          const wrap = document.createElement('span')
          wrap.className = 'gsap-word'
          const inner = document.createElement('span')
          inner.className = 'gsap-word-inner'
          inner.textContent = word
          wrap.appendChild(inner)
          wrap.appendChild(document.createTextNode(' '))
          element.appendChild(wrap)
          return inner
        })

        gsap.fromTo(
          inners,
          { yPercent: 118, autoAlpha: 0, rotate: 1.5 },
          {
            yPercent: 0,
            autoAlpha: 1,
            rotate: 0,
            duration: 1,
            ease: 'power4.out',
            stagger: 0.04,
            scrollTrigger: { trigger: element, start: 'top 90%', once: true },
          },
        )
      })

      root.querySelectorAll('[data-float]').forEach((element, index) => {
        const distance = Number(element.dataset.float) || 12
        gsap.to(element, {
          y: -distance,
          duration: 2.6 + index * 0.25,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: index * 0.3,
        })
      })

      root.querySelectorAll('[data-draw]').forEach((element) => {
        gsap.fromTo(
          element,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.1,
            ease: 'power3.inOut',
            transformOrigin: 'left center',
            scrollTrigger: { trigger: element, start: 'top 94%', once: true },
          },
        )
      })

      root.querySelectorAll('[data-scrub-zoom]').forEach((element) => {
        gsap.fromTo(
          element,
          { scale: 1.16 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: element.parentElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6,
            },
          },
        )
      })

      root.querySelectorAll('[data-counter]').forEach((element) => {
        const target = Number(element.dataset.counter)
        if (!Number.isFinite(target)) return
        const decimals = Number(element.dataset.decimals || 0)
        const prefix = element.dataset.prefix || ''
        const suffix = element.dataset.suffix || ''
        const state = { value: 0 }
        gsap.to(state, {
          value: target,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate: () => {
            element.textContent = `${prefix}${state.value.toFixed(decimals)}${suffix}`
          },
          scrollTrigger: {
            trigger: element,
            start: 'top 92%',
            once: true,
          },
        })
      })

      root.querySelectorAll('[data-reveal-group]').forEach((group) => {
        const items = group.querySelectorAll('[data-reveal-item]')
        if (!items.length) return
        gsap.fromTo(
          items,
          { y: 42, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.09,
            scrollTrigger: {
              trigger: group,
              start: 'top 86%',
              once: true,
            },
          },
        )
      })

      root.querySelectorAll('.gsap-reveal').forEach((element) => {
        gsap.fromTo(
          element,
          { y: 34, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 89%',
              once: true,
            },
          },
        )
      })

      ScrollTrigger.refresh()
    }, root)

    const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 700)

    return () => {
      window.clearTimeout(refreshTimer)
      context.revert()
    }
  }, [rootRef])
}
