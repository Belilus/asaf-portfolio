import { useEffect, useRef } from 'react'
import QRCode from 'qrcode'
import type { LensId } from '../content/profile'
import { lensShareUrls } from '../content/lensMeta'

export function ShareCard({ lensId }: { lensId: LensId }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const url = lensShareUrls[lensId]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    QRCode.toCanvas(canvas, url, {
      width: 160,
      margin: 1,
      color: { dark: '#081e45', light: '#ffffff' },
    }).catch(() => {})
  }, [url])

  return (
    <div className="portal-card flex flex-col items-center gap-4 p-5 sm:flex-row sm:items-start">
      <canvas
        ref={canvasRef}
        className="rounded-md border border-border bg-white p-2"
        aria-label={`QR code for ${url}`}
      />
      <div className="text-center sm:text-left">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">
          Open on your phone
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Scan to open this portfolio, or add it to your home screen from the browser menu.
        </p>
        <a
          href={url}
          className="focus-ring mt-3 inline-block break-all font-mono text-sm text-primary underline-offset-4 hover:underline"
        >
          {url.replace(/^https:\/\//, '')}
        </a>
      </div>
    </div>
  )
}
