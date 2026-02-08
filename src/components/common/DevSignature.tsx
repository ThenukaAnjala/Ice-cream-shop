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
    <span className="text-[0.5rem] uppercase tracking-[0.28em] text-slate-500 sm:text-[0.6rem] sm:tracking-[0.38em]">
      Developed by <span className="font-semibold text-slate-700">{name}</span>
    </span>
  )

  return (
    <div
      className={`pointer-events-auto fixed bottom-4 left-1/2 z-40 w-[90%] max-w-[360px] -translate-x-1/2 rounded-full border border-white/60 bg-white/70 px-4 py-2 text-center shadow-sm backdrop-blur sm:bottom-6 sm:w-auto sm:max-w-none sm:px-5 md:left-auto md:right-8 md:translate-x-0 ${className}`}
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
