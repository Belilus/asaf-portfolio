/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Locks this deploy to one lens — no switcher, root URL only. */
  readonly VITE_PORTFOLIO_LENS?: 'research' | 'fullstack' | 'pm' | 'data' | 'backend' | 'frontend'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
