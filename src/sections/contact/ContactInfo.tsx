type SocialLink = {
  label: string
  href: string
}

type Props = {
  name: string
  email: string
  socials: SocialLink[]
  onHoverStart: () => void
  onHoverEnd: () => void
}

export default function ContactInfo({
  name,
  email,
  socials,
  onHoverStart,
  onHoverEnd,
}: Props) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Contact</p>
      <h1 className="font-display mt-4 text-4xl leading-tight sm:text-5xl">
        Let&apos;s Scoop Up Your Next Project!
      </h1>
      <p className="mt-2 text-sm font-semibold text-slate-700">{name}</p>

      <div className="mt-8 space-y-4 text-sm text-slate-700">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Email</p>
          <a
            className="hover:text-slate-900"
            href={`mailto:${email}`}
            onMouseEnter={onHoverStart}
            onMouseLeave={onHoverEnd}
          >
            {email}
          </a>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Social
          </p>
          <div className="mt-2 flex flex-wrap gap-3 text-sm">
            {socials.map((social) => (
              <a
                key={social.label}
                className="rounded-full border border-white/70 bg-white/70 px-4 py-2 shadow-sm backdrop-blur hover:text-slate-900"
                href={social.href}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={onHoverStart}
                onMouseLeave={onHoverEnd}
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
