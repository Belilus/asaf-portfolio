import type { ReactNode } from 'react'

/* ---------------------------------------------------------------- icons */
/* Inline so the site ships with zero icon-library weight. */

const ic = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export function IconMail({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...ic} aria-hidden="true">
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  )
}

export function IconLinkedIn({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95C21.4 8.75 22 11.1 22 14.2V21h-4v-6c0-1.43-.03-3.27-2-3.27-2 0-2.3 1.56-2.3 3.17V21h-4V9Z" />
    </svg>
  )
}

export function IconGitHub({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.49l-.01-1.7c-2.78.62-3.37-1.37-3.37-1.37-.46-1.18-1.11-1.5-1.11-1.5-.91-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.57 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.05 0-1.12.39-2.03 1.03-2.74-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.35 9.35 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.71 1.03 1.62 1.03 2.74 0 3.92-2.34 4.79-4.57 5.04.36.32.68.94.68 1.9l-.01 2.82c0 .27.18.6.69.49A10.06 10.06 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z" />
    </svg>
  )
}

export function IconDownload({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...ic} aria-hidden="true">
      <path d="M12 3v12m0 0 4.5-4.5M12 15l-4.5-4.5M4 17v2.5A1.5 1.5 0 0 0 5.5 21h13a1.5 1.5 0 0 0 1.5-1.5V17" />
    </svg>
  )
}

export function IconSun({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...ic} aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
    </svg>
  )
}

export function IconMoon({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...ic} aria-hidden="true">
      <path d="M21 13.2A8.5 8.5 0 1 1 10.8 3a6.8 6.8 0 0 0 10.2 10.2Z" />
    </svg>
  )
}

export function IconImage({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...ic} aria-hidden="true">
      <rect x="3" y="4.5" width="18" height="15" rx="2" />
      <circle cx="8.5" cy="9.5" r="1.5" />
      <path d="m4 17 4.5-4.5 3 3L15 11l5 5" />
    </svg>
  )
}

export function IconChevron({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...ic} aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

/* ------------------------------------------------------------- buttons */

interface BtnProps {
  href?: string
  onClick?: () => void
  children: ReactNode
  variant?: 'primary' | 'outline' | 'ghost'
  download?: string | boolean
  className?: string
  ariaLabel?: string
}

export function Button({
  href,
  onClick,
  children,
  variant = 'outline',
  download,
  className = '',
  ariaLabel,
}: BtnProps) {
  const base =
    'focus-ring inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition-all duration-base ease-out-expo active:scale-[0.98]'

  const variants: Record<string, string> = {
    primary:
      'bg-primary text-primary-foreground shadow-sm hover:shadow-md hover:brightness-[1.06]',
    outline:
      'border border-border bg-card text-foreground hover:border-primary/60 hover:bg-accent',
    ghost: 'text-muted-foreground hover:bg-accent hover:text-foreground',
  }

  const cls = `${base} ${variants[variant]} ${className}`

  if (href) {
    const external = href.startsWith('http')
    return (
      <a
        href={href}
        aria-label={ariaLabel}
        className={cls}
        {...(download ? { download } : {})}
        {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
      >
        {children}
      </a>
    )
  }
  return (
    <button type="button" onClick={onClick} aria-label={ariaLabel} className={cls}>
      {children}
    </button>
  )
}

/* ------------------------------------------------------------ section */

export function SectionHeading({
  eyebrow,
  title,
  lead,
  id,
}: {
  eyebrow: string
  title: string
  lead?: string
  id?: string
}) {
  return (
    <header id={id} className="mb-10 max-w-3xl scroll-mt-24">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-primary">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      {lead && <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{lead}</p>}
    </header>
  )
}

/* ------------------------------------------------------- media slot */

export function MediaPlaceholder({
  file,
  caption,
  hint,
  aspect = 'wide',
}: {
  file?: string
  caption: string
  hint: string
  aspect?: 'wide' | 'tall' | 'square'
}) {
  const ratio =
    aspect === 'wide' ? 'aspect-[16/9]' : aspect === 'tall' ? 'aspect-[3/4]' : 'aspect-[4/3]'

  if (file) {
    return (
      <figure className="group overflow-hidden rounded-lg border border-border bg-card shadow-sm">
        <img
          src={`${import.meta.env.BASE_URL}media/${file}`}
          alt={caption}
          loading="lazy"
          className={`${ratio} w-full object-cover transition-transform duration-slow ease-out-expo group-hover:scale-[1.02]`}
        />
        <figcaption className="border-t border-border px-4 py-3 text-sm text-muted-foreground">
          {caption}
        </figcaption>
      </figure>
    )
  }

  return (
    <figure
      className={`${ratio} flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-muted/40 p-6 text-center`}
    >
      <IconImage className="h-5 w-5 text-muted-foreground/60" />
      <figcaption className="text-sm font-medium text-muted-foreground">{caption}</figcaption>
      <p className="max-w-[26ch] text-sm leading-relaxed text-muted-foreground/80">{hint}</p>
    </figure>
  )
}
