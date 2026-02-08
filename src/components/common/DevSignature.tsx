type DevSignatureProps = {
  name: string
  href?: string
  className?: string
}

export default function DevSignature({
  name,
  href,
  className = "",
}: DevSignatureProps) {
  const content = (
    <span className="text-[0.6rem] uppercase tracking-[0.38em] text-slate-500">
      Developed by <span className="font-semibold text-slate-700">{name}</span>
    </span>
  )

  return (
    <div
      className={`pointer-events-auto fixed bottom-6 left-1/2 z-40 -translate-x-1/2 rounded-full border border-white/60 bg-white/70 px-5 py-2 text-center shadow-sm backdrop-blur md:left-auto md:right-8 md:translate-x-0 ${className}`}
    >
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="transition hover:text-slate-800"
        >
          {content}
        </a>
      ) : (
        content
      )}
    </div>
  )
}
