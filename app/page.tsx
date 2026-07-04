"use client";

import Link from "next/link";
import {
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const links = {
  theInsight: "https://the-insightmain.vercel.app/",
  insightLRN: "https://insightlrn.vercel.app/",
  insightCreate: "https://insight-create.vercel.app/",
  instagram: "https://www.instagram.com/christianhansen_7/",
  linkedin: "https://www.linkedin.com/in/REPLACE-WITH-CHRISTIANS-LINKEDIN/",
  youtube: "https://www.youtube.com/@ChristianHansenTrack",
  email: "mailto:27christianh@wab.edu",
};

type WindowId = "insight" | "lrn" | "articles" | "create" | "about" | "toolkit";

type WindowPanel = {
  id: WindowId;
  iconTitle: string;
  iconLabel: string;
  iconVariant: IconVariant;
  windowTitle: string;
  eyebrow: string;
  headline: string;
  script: string;
  description: string;
  stats: Array<{ label: string; value: string }>;
  points?: string[];
  tiles?: string[];
  actionLabel: string;
  href: string;
  external?: boolean;
};

type DockItem =
  | { label: string; icon: ReactNode; className: string; type: "window"; windowId: WindowId }
  | { label: string; icon: ReactNode; className: string; type: "external"; href: string };

type OpenWindow = {
  id: WindowId;
  x: number;
  y: number;
  width: number;
};

type DragState = {
  id: WindowId;
  offsetX: number;
  offsetY: number;
};

type IconVariant = "insight" | "lrn" | "articles" | "create" | "about" | "toolkit";

const panels: WindowPanel[] = [
  {
    id: "insight",
    iconTitle: "The Insight",
    iconLabel: "The Insight",
    iconVariant: "insight",
    windowTitle: "The Insight",
    eyebrow: "Publishing ecosystem",
    headline: "THE INSIGHT",
    script: "The Insight",
    description:
      "Student essays, research, interviews, podcasts, and serious public writing built into one editorial system.",
    stats: [
      { label: "Role", value: "Founder" },
      { label: "Focus", value: "Publishing" },
      { label: "Status", value: "Active" },
    ],
    points: [
      "Essays, opinion, and long-form research",
      "Interviews and podcast conversations",
      "A public archive for student thinking",
      "Editorial systems built to compound over time",
    ],
    actionLabel: "Visit The Insight",
    href: links.theInsight,
    external: true,
  },
  {
    id: "lrn",
    iconTitle: "InsightLRN",
    iconLabel: "InsightLRN",
    iconVariant: "lrn",
    windowTitle: "InsightLRN",
    eyebrow: "Learning system",
    headline: "INSIGHTLRN",
    script: "InsightLRN",
    description:
      "Tools for flashcards, notes, retrieval practice, and structured academic systems that make learning durable.",
    stats: [
      { label: "Role", value: "Builder" },
      { label: "Focus", value: "Learning" },
      { label: "Status", value: "Active" },
    ],
    points: [
      "Flashcards and retrieval workflows",
      "Highlighted notes and library structure",
      "IB-aligned study systems",
      "Designed for durable academic memory",
    ],
    actionLabel: "Open InsightLRN",
    href: links.insightLRN,
    external: true,
  },
  {
    id: "articles",
    iconTitle: "Articles",
    iconLabel: "Articles",
    iconVariant: "articles",
    windowTitle: "Articles",
    eyebrow: "Featured writing",
    headline: "ARTICLES",
    script: "As Seen In",
    description:
      "Essays, explainers, interviews, and student research that sit inside the wider Insight publishing archive.",
    stats: [
      { label: "Format", value: "Writing" },
      { label: "Home", value: "The Insight" },
      { label: "Status", value: "Live" },
    ],
    tiles: ["Essays", "Research", "Interviews", "Opinion", "Publishing", "Archive"],
    actionLabel: "Open Articles",
    href: `${links.theInsight}/articles`,
    external: true,
  },
  {
    id: "create",
    iconTitle: "Insight Create",
    iconLabel: "Insight Create",
    iconVariant: "create",
    windowTitle: "Insight Create",
    eyebrow: "Creative infrastructure",
    headline: "INSIGHT CREATE",
    script: "Create",
    description:
      "The build layer for pages, launches, creative systems, media outputs, and the infrastructure behind Christian’s work.",
    stats: [
      { label: "Role", value: "Operator" },
      { label: "Focus", value: "Execution" },
      { label: "Status", value: "Building" },
    ],
    points: [
      "Launch pages and creative systems",
      "Media, product, and brand execution",
      "Reusable workflows and templates",
      "The infrastructure behind every rollout",
    ],
    actionLabel: "Open Insight Create",
    href: links.insightCreate,
    external: true,
  },
  {
    id: "about",
    iconTitle: "About",
    iconLabel: "About Christian",
    iconVariant: "about",
    windowTitle: "About Christian",
    eyebrow: "Public profile",
    headline: "CHRISTIAN HANSEN",
    script: "About",
    description:
      "IB student, founder of The Insight, and builder of publishing, learning, research, and media systems.",
    stats: [
      { label: "Role", value: "Founder" },
      { label: "Base", value: "The Insight" },
      { label: "Mode", value: "Building" },
    ],
    points: [
      "Publishing, research, and interviews",
      "Education technology and learning systems",
      "Podcasts, essays, and public work",
      "An ecosystem instead of a portfolio",
    ],
    actionLabel: "Read About Christian",
    href: "/about",
  },
  {
    id: "toolkit",
    iconTitle: "Toolkit",
    iconLabel: "Toolkit",
    iconVariant: "toolkit",
    windowTitle: "Toolkit",
    eyebrow: "Systems stack",
    headline: "TOOLKIT",
    script: "Toolkit",
    description:
      "Builder workflows, learning architecture, editorial systems, and project infrastructure behind the ecosystem.",
    stats: [
      { label: "Type", value: "Systems" },
      { label: "Scope", value: "Cross-project" },
      { label: "Status", value: "Live" },
    ],
    points: [
      "Editorial and publishing workflows",
      "Codex, Git, and Vercel execution loops",
      "Study systems and academic retrieval",
      "Launch processes for products and media",
    ],
    actionLabel: "Open Toolkit",
    href: "/projects",
  },
];

const desktopIcons = panels.filter((panel) =>
  ["insight", "lrn", "articles", "create"].includes(panel.id),
);

const floatingCards = [
  {
    kind: "ecosystem",
    title: "THE INSIGHT",
    subtitle: "Essays, research, and public thinking.",
    caption: "Featured article drops, editorial work, and public-facing publishing.",
    tone: "insight",
    href: `${links.theInsight}/articles`,
    rotate: "-12deg",
  },
  {
    kind: "ecosystem",
    title: "IB SYSTEM",
    subtitle: "Learning workflows that compound.",
    caption: "Flashcards, notes, and study architecture.",
    tone: "lrn",
    href: links.insightLRN,
    rotate: "8deg",
  },
  {
    kind: "ecosystem",
    title: "CREATE DROP",
    subtitle: "Launches, systems, and creative execution.",
    caption: "The execution layer behind every release and rollout.",
    tone: "build",
    href: links.insightCreate,
    rotate: "-4deg",
  },
  {
    kind: "ecosystem",
    title: "ARTWORK DROP",
    subtitle: "Covers, layouts, and visual system experiments.",
    caption: "One artwork-led card in the mix for the broader ecosystem.",
    tone: "artwork",
    href: links.insightCreate,
    rotate: "9deg",
  },
  {
    kind: "podcast",
    title: "Consulting before consulting: high school, university, and early positioning",
    subtitle: "Career Paths+ • March 28, 2026",
    caption: "How students should think about consulting early and build useful signal.",
    tone: "podcast",
    href: `${links.theInsight}/podcasts/consulting-high-school-university`,
    rotate: "-6deg",
    meta: "Latest podcast",
    thumbnail: "https://the-insightmain.vercel.app/images/podcast-series/career-paths-plus.jpg",
  },
  {
    kind: "podcast",
    title: "Economics early: what to study, how to think, and what the field really demands",
    subtitle: "The Academic • March 28, 2026",
    caption: "A serious foundation for economics before university and beyond.",
    tone: "academic",
    href: `${links.theInsight}/podcasts/economics-high-school-university`,
    rotate: "6deg",
    meta: "Latest podcast",
    thumbnail: "https://the-insightmain.vercel.app/images/podcast-series/the-academic.jpg",
  },
  {
    kind: "podcast",
    title: "Investment banking early: what students should know before recruiting starts",
    subtitle: "Career Paths+ • March 28, 2026",
    caption: "What to build before recruiting intensifies and why it compounds.",
    tone: "podcast",
    href: `${links.theInsight}/podcasts/investment-banking-high-school-university`,
    rotate: "-10deg",
    meta: "Latest podcast",
    thumbnail: "https://the-insightmain.vercel.app/images/podcast-series/career-paths-plus.jpg",
  },
  {
    kind: "video",
    title: "APAC RECORD | 800m | 1:58:51",
    subtitle: "Christian Hansen Track • 2026",
    caption: "WAB '27",
    tone: "track",
    href: "https://www.youtube.com/watch?v=dMm1Nal7dvc",
    rotate: "-14deg",
    meta: "Track video",
    thumbnail: "https://i.ytimg.com/vi/dMm1Nal7dvc/hqdefault.jpg",
  },
  {
    kind: "video",
    title: "Open | 400m | 51:54",
    subtitle: "Christian Hansen Track • APAC 2026",
    caption: "WAB '27",
    tone: "track",
    href: "https://www.youtube.com/watch?v=59jjq70Q2jQ",
    rotate: "7deg",
    meta: "Track video",
    thumbnail: "https://i.ytimg.com/vi/59jjq70Q2jQ/hqdefault.jpg",
  },
  {
    kind: "video",
    title: "SMR | 400m Split | ~ 50:10",
    subtitle: "Christian Hansen Track • APAC 2026",
    caption: "WAB '27",
    tone: "track",
    href: "https://www.youtube.com/watch?v=MZsRR05oTaA",
    rotate: "-9deg",
    meta: "Track video",
    thumbnail: "https://i.ytimg.com/vi/MZsRR05oTaA/hqdefault.jpg",
  },
];

const dockItems: DockItem[] = [
  { label: "About", icon: <MonogramIcon text="CH" />, className: "dockItem-about", type: "window", windowId: "about" },
  { label: "YouTube", icon: <YouTubeIcon />, className: "dockItem-youtube", type: "external", href: links.youtube },
  { label: "Podcasts", icon: <PodcastsIcon />, className: "dockItem-podcasts", type: "external", href: `${links.theInsight}/podcasts` },
  { label: "Email", icon: <MailIcon />, className: "dockItem-email", type: "external", href: links.email },
  { label: "Instagram", icon: <InstagramIcon />, className: "dockItem-instagram", type: "external", href: links.instagram },
  { label: "LinkedIn", icon: <LinkedInIcon />, className: "dockItem-linkedin", type: "external", href: links.linkedin },
];

const MOBILE_BREAKPOINT = 900;
const WINDOW_HEIGHT = 560;

function MonogramIcon({ text }: { text: string }) {
  return <span className="monogramIcon">{text}</span>;
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M23.5 7.2a3 3 0 0 0-2.1-2.1C19.6 4.6 12 4.6 12 4.6s-7.6 0-9.4.5A3 3 0 0 0 .5 7.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.8.5 9.4.5 9.4.5s7.6 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-4.8Z"
      />
      <path fill="#fff" d="m9.7 15.7 6.3-3.7-6.3-3.7Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4.1" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.4" cy="6.7" r="1.2" fill="currentColor" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M20.45 20.45h-3.56v-5.58c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.95v5.67H9.33V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.27 2.38 4.27 5.47v6.27ZM5.31 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.09 20.45H3.53V9h3.56v11.45Z"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3.25" y="5.75" width="17.5" height="12.5" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="m4.8 7.5 7.2 5.35 7.2-5.35"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PodcastsIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="2.4" fill="currentColor" />
      <circle cx="12" cy="12" r="5.4" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 1.9a10.1 10.1 0 0 0-3.95 19.4l.9-2.4a7.6 7.6 0 1 1 6.1 0l.9 2.4A10.1 10.1 0 0 0 12 1.9Z"
        fill="currentColor"
      />
    </svg>
  );
}

function DesktopAppArtwork({ variant }: { variant: IconVariant }) {
  return (
    <span className={`desktopAppArtwork desktopAppArtwork-${variant}`} aria-hidden="true">
      <span className="desktopAppArtworkGlass" />
      <span className="desktopAppArtworkMark">
        {variant === "insight" ? "TI" : null}
        {variant === "lrn" ? "LRN" : null}
        {variant === "articles" ? "AR" : null}
        {variant === "create" ? "CR" : null}
        {variant === "about" ? "CH" : null}
        {variant === "toolkit" ? "TK" : null}
      </span>
    </span>
  );
}

function getWindowWidth(viewportWidth: number) {
  if (viewportWidth <= 640) {
    return Math.max(viewportWidth - 24, 220);
  }

  if (viewportWidth <= MOBILE_BREAKPOINT) {
    return Math.max(viewportWidth - 36, 320);
  }

  return Math.min(920, viewportWidth - 180);
}

function clampWindowPosition(x: number, y: number, width: number) {
  if (typeof window === "undefined") {
    return { x, y };
  }

  const minLeft = 18;
  const maxLeft = Math.max(minLeft, window.innerWidth - width - 18);
  const minTop = 74;
  const maxTop = Math.max(minTop, window.innerHeight - 120);

  return {
    x: Math.min(Math.max(x, minLeft), maxLeft),
    y: Math.min(Math.max(y, minTop), maxTop),
  };
}

function createCenteredWindow(id: WindowId): OpenWindow {
  if (typeof window === "undefined") {
    return { id, x: 0, y: 0, width: 920 };
  }

  const width = getWindowWidth(window.innerWidth);
  const centered = clampWindowPosition(
    Math.round((window.innerWidth - width) / 2),
    Math.round((window.innerHeight - WINDOW_HEIGHT) / 2),
    width,
  );

  return { id, width, ...centered };
}

function formatTime(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(date);
}

function WindowAction({
  href,
  external,
  label,
}: {
  href: string;
  external?: boolean;
  label: string;
}) {
  const isMailto = href.startsWith("mailto:");

  if (external) {
    return (
      <a
        className="windowCta"
        href={href}
        target={isMailto ? undefined : "_blank"}
        rel={isMailto ? undefined : "noreferrer"}
      >
        <span>{label}</span>
        <span className="windowCtaArrow">↗</span>
      </a>
    );
  }

  return (
    <Link className="windowCta" href={href}>
      <span>{label}</span>
      <span className="windowCtaArrow">↗</span>
    </Link>
  );
}

function DesktopWindow({
  panel,
  x,
  y,
  width,
  isFront,
  mobile,
  onActivate,
  onDragStart,
  onClose,
}: {
  panel: WindowPanel;
  x: number;
  y: number;
  width: number;
  isFront: boolean;
  mobile: boolean;
  onActivate: () => void;
  onDragStart: (event: ReactPointerEvent<HTMLElement>) => void;
  onClose: () => void;
}) {
  return (
    <article
      className="desktopWindow"
      style={
        {
          left: x,
          top: y,
          width,
        } as CSSProperties
      }
      data-front={isFront}
      onPointerDown={onActivate}
    >
      <header className="windowBar">
        <button className="trafficLights" type="button" aria-label={`Close ${panel.windowTitle}`} onClick={onClose}>
          <span />
          <span />
          <span />
        </button>
        <span className="windowBarTitle">{panel.windowTitle}</span>
        {!mobile ? (
          <div
            className="windowDragHandle"
            onPointerDown={onDragStart}
            role="presentation"
            aria-hidden="true"
          />
        ) : null}
      </header>

      <div className="windowContent">
        <div className="windowPrimary">
          <p className="windowEyebrow">{panel.eyebrow}</p>
          <h2 className="windowHeadline">{panel.headline}</h2>
          <p className="windowScript">{panel.script}</p>
          <p className="windowDescription">{panel.description}</p>

          <div className="windowStats">
            {panel.stats.map((stat) => (
              <div key={stat.label}>
                <span>{stat.label}</span>
                <strong>{stat.value}</strong>
              </div>
            ))}
          </div>

          <p className="windowBody">
            Christian is building publishing, learning, research, and execution infrastructure
            as one connected ecosystem rather than disconnected projects.
          </p>

          <WindowAction href={panel.href} external={panel.external} label={panel.actionLabel} />
        </div>

        <aside className="windowSecondary">
          {panel.points ? (
            <div className="windowChecklist">
              {panel.points.map((point) => (
                <div key={point} className="windowChecklistItem">
                  <span className="windowChecklistDot" />
                  <p>{point}</p>
                </div>
              ))}
            </div>
          ) : null}

          {panel.tiles ? (
            <div className="windowTileGrid">
              {panel.tiles.map((tile) => (
                <div key={tile} className="windowTile">
                  {tile}
                </div>
              ))}
            </div>
          ) : null}
        </aside>
      </div>
    </article>
  );
}

export default function Home() {
  const [entered, setEntered] = useState(false);
  const [now, setNow] = useState(new Date());
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [openWindows, setOpenWindows] = useState<OpenWindow[]>([]);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const dragStateRef = useRef<DragState | null>(null);

  useEffect(() => {
    const updateNow = () => setNow(new Date());
    let intervalId: number | undefined;

    updateNow();

    const current = new Date();
    const delay = (60 - current.getSeconds()) * 1000 - current.getMilliseconds();

    const timeoutId = window.setTimeout(() => {
      updateNow();
      intervalId = window.setInterval(updateNow, 60_000);
    }, delay);

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, []);

  useEffect(() => {
    const enter = () => setEntered(true);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp" || event.key === "Enter") {
        enter();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const syncViewport = () => {
      setIsMobileViewport(window.innerWidth <= MOBILE_BREAKPOINT);
      setOpenWindows((current) =>
        current.map((item) => {
          const width = getWindowWidth(window.innerWidth);
          const position = clampWindowPosition(item.x, item.y, width);
          return { ...item, width, ...position };
        }),
      );
    };

    syncViewport();
    window.addEventListener("resize", syncViewport);

    return () => window.removeEventListener("resize", syncViewport);
  }, []);

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      const drag = dragStateRef.current;
      if (!drag) {
        return;
      }

      setOpenWindows((current) =>
        current.map((item) => {
          if (item.id !== drag.id) {
            return item;
          }

          const next = clampWindowPosition(event.clientX - drag.offsetX, event.clientY - drag.offsetY, item.width);
          return { ...item, ...next };
        }),
      );
    };

    const onPointerUp = () => {
      dragStateRef.current = null;
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, []);

  const time = useMemo(() => formatTime(now), [now]);
  const dateLabel = useMemo(() => formatDate(now), [now]);

  const enter = () => setEntered(true);

  const openWindow = (id: WindowId) => {
    setOpenWindows((current) => {
      const existing = current.find((item) => item.id === id);
      if (existing) {
        return [...current.filter((item) => item.id !== id), existing];
      }

      return [...current, createCenteredWindow(id)];
    });
  };

  const closeWindow = (id: WindowId) => {
    dragStateRef.current = dragStateRef.current?.id === id ? null : dragStateRef.current;
    setOpenWindows((current) => current.filter((item) => item.id !== id));
  };

  const activateWindow = (id: WindowId) => {
    setOpenWindows((current) => {
      const target = current.find((item) => item.id === id);
      if (!target || current[current.length - 1]?.id === id) {
        return current;
      }

      return [...current.filter((item) => item.id !== id), target];
    });
  };

  const startDragWindow = (id: WindowId, event: ReactPointerEvent<HTMLElement>) => {
    if (isMobileViewport) {
      return;
    }

    event.preventDefault();
    activateWindow(id);

    const target = openWindows.find((item) => item.id === id);
    if (!target) {
      return;
    }

    dragStateRef.current = {
      id,
      offsetX: event.clientX - target.x,
      offsetY: event.clientY - target.y,
    };
  };

  return (
    <main className="osShell">
      <div className="osWallpaper" aria-hidden="true" />
      <div className="osGlow" aria-hidden="true" />
      <div className="osNoise" aria-hidden="true" />

      {!entered ? (
        <section
          className="lockScreen"
          onClick={enter}
          onTouchStart={(event) => setTouchStartY(event.touches[0]?.clientY ?? null)}
          onTouchEnd={(event) => {
            if (touchStartY === null) {
              return;
            }

            const endY = event.changedTouches[0]?.clientY ?? touchStartY;
            if (touchStartY - endY > 40) {
              enter();
            }

            setTouchStartY(null);
          }}
        >
          <div className="lockScreenInner">
            <span className="lockGlyph" aria-hidden="true" />
            <p className="lockTime">{time}</p>
            <p className="lockDate">{dateLabel}</p>
          </div>

          <div className="lockFooter">
            <span className="lockArrow">↑</span>
            <p className="unlockHint">Swipe up · click · or press ↑ to enter</p>
            <span className="homeBar" aria-hidden="true" />
          </div>
        </section>
      ) : (
        <section className="desktopScene" aria-label="Christian Hansen OS desktop">
          <header className="desktopIntro">
            <h1>hello</h1>
            <p>I&apos;m Christian Hansen — founder, publisher, builder.</p>
            <span>CLICK AN ICON TO LOOK AROUND — OR USE THE DOCK BELOW</span>
          </header>

          <div className="desktopRail" aria-label="Desktop apps">
            {desktopIcons.map((panel) => (
              <button
                key={panel.id}
                type="button"
                className="desktopApp"
                onClick={() => openWindow(panel.id)}
                aria-label={`Open ${panel.iconTitle}`}
              >
                <span className="desktopAppIcon">
                  <DesktopAppArtwork variant={panel.iconVariant} />
                </span>
                <span className="desktopAppLabel">{panel.iconLabel}</span>
              </button>
            ))}
          </div>

          <div className="floatingDeck">
            <div className="floatingTrack">
              {[...floatingCards, ...floatingCards].map((card, index) => (
                <a
                  key={`${card.title}-${index}`}
                  className={`floatingCard floatingCard-${card.tone}`}
                  href={card.href}
                  target="_blank"
                  rel="noreferrer"
                  style={{ ["--card-rotate" as string]: card.rotate } as CSSProperties}
                >
                  <span
                    className="floatingCardScreen"
                    style={
                      card.thumbnail
                        ? {
                            backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.02), rgba(0, 0, 0, 0.08)), url(${card.thumbnail})`,
                          }
                        : undefined
                    }
                  />
                  <span className="floatingCardTint" />
                  <div className="floatingCardCopy">
                    {card.meta ? <small>{card.meta}</small> : null}
                    <strong>{card.title}</strong>
                    <p>{card.subtitle}</p>
                    <span>{card.caption}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="desktopWindows" aria-live="polite">
            {openWindows.map((item, index) => {
              const panel = panels.find((candidate) => candidate.id === item.id);
              if (!panel) {
                return null;
              }

              return (
                <DesktopWindow
                  key={item.id}
                  panel={panel}
                  x={item.x}
                  y={item.y}
                  width={item.width}
                  isFront={index === openWindows.length - 1}
                  mobile={isMobileViewport}
                  onActivate={() => activateWindow(item.id)}
                  onDragStart={(event) => startDragWindow(item.id, event)}
                  onClose={() => closeWindow(item.id)}
                />
              );
            })}
          </div>

          <nav className="desktopDock" aria-label="Dock">
            {dockItems.map((item) => {
              if (item.type === "window") {
                return (
                  <button
                    key={item.label}
                    type="button"
                    className={`dockItem dockItem-window ${item.className}`}
                    onClick={() => openWindow(item.windowId)}
                    aria-label={item.label}
                  >
                    {item.icon}
                  </button>
                );
              }

              const isMailto = item.href.startsWith("mailto:");

              return (
                <a
                  key={item.label}
                  className={`dockItem dockItem-link ${item.className}`}
                  href={item.href}
                  target={isMailto ? undefined : "_blank"}
                  rel={isMailto ? undefined : "noreferrer"}
                  aria-label={item.label}
                >
                  {item.icon}
                </a>
              );
            })}
          </nav>
        </section>
      )}
    </main>
  );
}
