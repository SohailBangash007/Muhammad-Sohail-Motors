function SectionHeading({ eyebrow, title, description, align = 'left', className = '' }) {
  const alignment = align === 'center' ? 'mx-auto items-center text-center' : 'items-start'
  return (
    <div className={`gsap-reveal flex max-w-2xl flex-col ${alignment} ${className}`}>
      <p className="eyebrow flex items-center gap-3">
        <span aria-hidden className="h-px w-8 shrink-0 bg-current opacity-60" />
        {eyebrow}
        {align === 'center' ? <span aria-hidden className="h-px w-8 shrink-0 bg-current opacity-60" /> : null}
      </p>
      <h2 className="display-font mt-4 text-4xl leading-[1.05] text-ink sm:text-5xl lg:text-[3.4rem]" data-split>
        {title}
      </h2>
      {description && (
        <p className="mt-5 max-w-xl text-sm leading-7 text-muted sm:text-base">{description}</p>
      )}
    </div>
  )
}

export default SectionHeading
