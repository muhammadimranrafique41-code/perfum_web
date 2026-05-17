export default function OrnamentDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-4">
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-brand-gold/40" />
      <span className="w-2 h-2 rotate-45 border border-brand-gold/60" />
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-brand-gold/40" />
    </div>
  )
}
