'use client'

import GrainOverlay from './GrainOverlay'

export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }} aria-hidden="true">
      <div className="ambient-blob ambient-blob-1" />
      <div className="ambient-blob ambient-blob-2" />
      <GrainOverlay />
    </div>
  )
}
