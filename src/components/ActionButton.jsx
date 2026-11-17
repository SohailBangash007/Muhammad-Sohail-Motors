import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap, canHover, prefersReducedMotion } from '../lib/animations.js'

const VARIANTS = {
  primary: 'action-btn--primary',
  outline: 'action-btn--outline',
  dark: 'action-btn--dark',
  light: 'action-btn--light',
  ghost: 'action-btn--ghost',
}

const SIZES = {
  sm: 'action-btn--sm',
  md: '',
  lg: 'action-btn--lg',
}

/**
 * A pill shaped, magnetic button with a GSAP driven hover:
 * the whole button leans toward the cursor, the label lifts,
 * and a soft light sweep crosses the surface.
 */
function ActionButton({
  children,
  to,
  href,
  icon = null,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  onClick,
  disabled = false,
  ...rest
}) {
  const buttonRef = useRef(null)
  const shineRef = useRef(null)
  const iconRef = useRef(null)
  const isLink = Boolean(to)
  const isAnchor = Boolean(href) && !isLink

  useEffect(() => {
    const element = buttonRef.current
    if (!element || prefersReducedMotion()) return undefined

    const shine = shineRef.current
    const iconElement = iconRef.current
    const xTo = gsap.quickTo(element, 'x', { duration: 0.55, ease: 'power3.out' })
    const yTo = gsap.quickTo(element, 'y', { duration: 0.55, ease: 'power3.out' })

    const handleMove = (event) => {
      if (!canHover()) return
      const bounds = element.getBoundingClientRect()
      const relX = event.clientX - bounds.left - bounds.width / 2
      const relY = event.clientY - bounds.top - bounds.height / 2
      xTo(relX * 0.2)
      yTo(relY * 0.35)
    }

    const handleEnter = () => {
      if (!canHover()) return
      gsap.to(element, { scale: 1.045, duration: 0.45, ease: 'power3.out', overwrite: 'auto' })
      if (iconElement) {
        gsap.to(iconElement, { x: 3, y: -3, rotate: 45, duration: 0.45, ease: 'power3.out', overwrite: 'auto' })
      }
      if (shine) {
        gsap.fromTo(
          shine,
          { xPercent: -170, skewX: -14, opacity: 0.9 },
          { xPercent: 170, skewX: -14, opacity: 0, duration: 0.95, ease: 'power2.inOut', overwrite: 'auto' },
        )
      }
    }

    const handleLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.85,
        ease: 'elastic.out(1, 0.42)',
        overwrite: 'auto',
      })
      if (iconElement) {
        gsap.to(iconElement, { x: 0, y: 0, rotate: 0, duration: 0.5, ease: 'power3.out', overwrite: 'auto' })
      }
    }

    const handleDown = () => {
      gsap.to(element, { scale: 0.965, duration: 0.14, ease: 'power2.out', overwrite: 'auto' })
    }

    const handleUp = () => {
      gsap.to(element, { scale: 1.045, duration: 0.3, ease: 'power2.out', overwrite: 'auto' })
    }

    element.addEventListener('pointerenter', handleEnter)
    element.addEventListener('pointermove', handleMove)
    element.addEventListener('pointerleave', handleLeave)
    element.addEventListener('pointerdown', handleDown)
    element.addEventListener('pointerup', handleUp)

    return () => {
      element.removeEventListener('pointerenter', handleEnter)
      element.removeEventListener('pointermove', handleMove)
      element.removeEventListener('pointerleave', handleLeave)
      element.removeEventListener('pointerdown', handleDown)
      element.removeEventListener('pointerup', handleUp)
    }
  }, [])

  const classes = [
    'action-btn',
    'group',
    VARIANTS[variant] ?? VARIANTS.primary,
    SIZES[size] ?? '',
    disabled ? 'pointer-events-none opacity-50' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const content = (
    <>
      <span aria-hidden className="action-btn__sheen" />
      <span aria-hidden className="action-btn__shine" data-btn-shine ref={shineRef} />
      <span className="action-btn__label">
        <span>{children}</span>
        {icon ? (
          <span className="action-btn__icon" data-btn-icon ref={iconRef}>
            {icon}
          </span>
        ) : null}
      </span>
    </>
  )

  if (isLink) {
    return (
      <Link className={classes} onClick={onClick} ref={buttonRef} to={to} {...rest}>
        {content}
      </Link>
    )
  }

  if (isAnchor) {
    return (
      <a className={classes} href={href} onClick={onClick} ref={buttonRef} {...rest}>
        {content}
      </a>
    )
  }

  return (
    <button className={classes} disabled={disabled} onClick={onClick} ref={buttonRef} type={type} {...rest}>
      {content}
    </button>
  )
}

export default ActionButton
