"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type AppItem = {
  title: string;
  href: string;
  icon: string;
  external?: boolean;
  soon?: boolean;
  aria: string;
};

const links = {
  theInsight: "https://the-insightmain.vercel.app/",
  insightLRN: "https://insightlrn.vercel.app/",
  insightCreate: "https://insight-create.vercel.app/",
  instagram: "https://www.instagram.com/christianhansen_7/",
  linkedin: "https://www.linkedin.com/in/REPLACE-WITH-YOUR-LINKEDIN-SLUG/",
  youtube: "https://www.youtube.com/@REPLACE-WITH-YOUR-YOUTUBE-HANDLE",
  email: "mailto:27christianh@wab.edu",
};

const apps: AppItem[] = [
  {
    title: "The Insight",
    href: links.theInsight,
    icon: "insight",
    external: true,
    aria: "Open The Insight publication and podcast platform",
  },
  {
    title: "InsightLRN",
    href: links.insightLRN,
    icon: "lrn",
    external: true,
    aria: "Open InsightLRN learning tools",
  },
  {
    title: "Insight Create",
    href: links.insightCreate,
    icon: "create",
    external: true,
    aria: "Open Insight Create",
  },
  {
    title: "Articles",
    href: `${links.theInsight}articles`,
    icon: "articles",
    external: true,
    aria: "Open articles from The Insight",
  },
  {
    title: "Podcasts",
    href: `${links.theInsight}podcasts`,
    icon: "podcasts",
    external: true,
    aria: "Open podcasts from The Insight",
  },
  {
    title: "About Christian",
    href: "/about",
    icon: "about",
    aria: "Open the full about page",
  },
  {
    title: "Videos",
    href: links.youtube,
    icon: "videos",
    external: true,
    soon: true,
    aria: "Open Christian Hansen YouTube channel",
  },
  {
    title: "Toolkit",
    href: "/projects",
    icon: "toolkit",
    aria: "Open the toolkit and project systems page",
  },
  {
    title: "Contact",
    href: links.email,
    icon: "contact",
    external: true,
    aria: "Email Christian Hansen",
  },
];

const socials = [
  { label: "YouTube", href: links.youtube },
  { label: "Instagram", href: links.instagram },
  { label: "LinkedIn", href: links.linkedin },
];

function formatClock(date: Date) {
  return new Intl.DateTimeFormat("en", {
    hour: "numeric",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

function AppAnchor({ app }: { app: AppItem }) {
  const content = (
    <>
      <span className={`app-icon app-icon-${app.icon}`} aria-hidden="true">
        <span className="icon-gloss" />
        <span className="icon-mark">{getIconMark(app.icon)}</span>
      </span>
      <span className="app-label">
        {app.soon ? <span className="soon">Soon</span> : null}
        {app.title}
      </span>
    </>
  );

  if (app.external) {
    return (
      <a href={app.href} target="_blank" rel="noreferrer" className="app-link" aria-label={app.aria}>
        {content}
      </a>
    );
  }

  return (
    <Link href={app.href} className="app-link" aria-label={app.aria}>
      {content}
    </Link>
  );
}

function getIconMark(icon: string) {
  const marks: Record<string, string> = {
    insight: "I",
    lrn: "L",
    create: "C",
    articles: "A",
    podcasts: "P",
    about: "CH",
    videos: "▶",
    toolkit: "T",
    contact: "@",
  };
  return marks[icon] ?? "•";
}

export default function Home() {
  const [entered, setEntered] = useState(false);
  const [now, setNow] = useState<Date | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  useEffect(() => {
    setNow(new Date());
    const timer = window.setInterval(() => setNow(new Date()), 15_000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (["ArrowUp", "Enter", " "].includes(event.key)) setEntered(true);
      if (event.key === "Escape") setEntered(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const time = useMemo(() => (now ? formatClock(now) : "9:41"), [now]);

  return (
    <main
      className={`os-page ${entered ? "entered" : "locked"}`}
      onTouchStart={(event) => setTouchStart(event.touches[0]?.clientY ?? null)}
      onTouchEnd={(event) => {
        if (touchStart === null) return;
        const end = event.changedTouches[0]?.clientY ?? touchStart;
        if (touchStart - end > 38) setEntered(true);
      }}
    >
      <div className="wallpaper" aria-hidden="true" />
      <div className="noise" aria-hidden="true" />

      <button
        className="lock-layer"
        aria-label="Enter Christian Hansen OS"
        type="button"
        onClick={() => setEntered(true)}
      >
        <span className="lock-time">{time}</span>
        <span className="unlock-copy">Swipe up · click · or press ↑ to enter</span>
        <span className="home-indicator" />
      </button>

      <section className="home-layer" aria-label="Christian Hansen OS home screen">
        <div className="top-time">{time}</div>

        <div className="app-grid" aria-label="Project apps">
          {apps.map((app) => (
            <AppAnchor key={app.title} app={app} />
          ))}
        </div>

        <nav className="social-dock" aria-label="Social links">
          {socials.map((social) => (
            <a key={social.label} href={social.href} target="_blank" rel="noreferrer">
              {social.label}
            </a>
          ))}
        </nav>
      </section>
    </main>
  );
}
