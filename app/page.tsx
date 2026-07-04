"use client";

import Link from "next/link";
import { type CSSProperties, useEffect, useMemo, useState } from "react";

const links = {
  theInsight: "https://the-insightmain.vercel.app/",
  insightLRN: "https://insightlrn.vercel.app/",
  insightCreate: "https://insight-create.vercel.app/",
  instagram: "https://www.instagram.com/christianhansen_7/",
  linkedin: "https://www.linkedin.com/in/REPLACE-WITH-CHRISTIANS-LINKEDIN/",
  youtube: "https://www.youtube.com/@REPLACE-WITH-CHRISTIANS-YOUTUBE/",
  email: "mailto:27christianh@wab.edu",
};

type WindowId = "insight" | "lrn" | "articles" | "create" | "about" | "toolkit";

type WindowPanel = {
  id: WindowId;
  iconTitle: string;
  iconLabel: string;
  mark: string;
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
  | { label: string; mark: string; type: "window"; windowId: WindowId }
  | { label: string; mark: string; type: "external"; href: string };

const panels: WindowPanel[] = [
  {
    id: "insight",
    iconTitle: "The Insight",
    iconLabel: "The Insight",
    mark: "TI",
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
    mark: "LRN",
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
    mark: "AR",
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
    mark: "CR",
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
    mark: "CH",
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
    mark: "TK",
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
    title: "THE INSIGHT",
    subtitle: "Essays, research, and public thinking.",
    tone: "insight",
    href: links.theInsight,
    left: "10%",
    bottom: "10%",
    rotate: "-12deg",
    width: "17vw",
  },
  {
    title: "IB SYSTEM",
    subtitle: "Learning workflows that compound.",
    tone: "lrn",
    href: links.insightLRN,
    left: "28%",
    bottom: "13%",
    rotate: "8deg",
    width: "18vw",
  },
  {
    title: "PODCAST CUT",
    subtitle: "Interviews and conversations in motion.",
    tone: "podcast",
    href: `${links.theInsight}/podcasts`,
    left: "50%",
    bottom: "11%",
    rotate: "-4deg",
    width: "17vw",
  },
  {
    title: "RESEARCH OS",
    subtitle: "Notes, flashcards, and retrieval design.",
    tone: "research",
    href: links.insightLRN,
    left: "71%",
    bottom: "12%",
    rotate: "10deg",
    width: "18vw",
  },
  {
    title: "BUILD LOOP",
    subtitle: "Execution systems behind every release.",
    tone: "build",
    href: links.insightCreate,
    left: "89%",
    bottom: "10%",
    rotate: "-15deg",
    width: "16vw",
  },
];

const dockItems: DockItem[] = [
  { label: "About", mark: "CH", type: "window", windowId: "about" as WindowId },
  { label: "YouTube", mark: "▶", type: "external", href: links.youtube },
  { label: "Toolkit", mark: "⌁", type: "window", windowId: "toolkit" as WindowId },
  { label: "Podcasts", mark: "◉", type: "external", href: `${links.theInsight}/podcasts` },
  { label: "Email", mark: "✉", type: "external", href: links.email },
  { label: "Instagram", mark: "◎", type: "external", href: links.instagram },
  { label: "LinkedIn", mark: "in", type: "external", href: links.linkedin },
];

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
  depth,
  onClose,
}: {
  panel: WindowPanel;
  depth: number;
  onClose: () => void;
}) {
  return (
    <article
      className="desktopWindow"
      style={
        {
          zIndex: 20 + depth,
          transform: `translate(${-depth * 42}px, ${-depth * 30}px)`,
        } as CSSProperties
      }
    >
      <header className="windowBar">
        <button className="trafficLights" type="button" aria-label={`Close ${panel.windowTitle}`} onClick={onClose}>
          <span />
          <span />
          <span />
        </button>
        <span className="windowBarTitle">{panel.windowTitle}</span>
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
  const [openWindows, setOpenWindows] = useState<WindowId[]>([]);

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

  const time = useMemo(() => formatTime(now), [now]);
  const dateLabel = useMemo(() => formatDate(now), [now]);

  const enter = () => setEntered(true);

  const openWindow = (id: WindowId) => {
    setOpenWindows((current) => {
      const next = current.filter((item) => item !== id);
      return [...next, id];
    });
  };

  const closeWindow = (id: WindowId) => {
    setOpenWindows((current) => current.filter((item) => item !== id));
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
                <span className="desktopAppIcon">{panel.mark}</span>
                <span className="desktopAppLabel">{panel.iconLabel}</span>
              </button>
            ))}
          </div>

          <div className="floatingDeck">
            {floatingCards.map((card) => (
              <a
                key={card.title}
                className={`floatingCard floatingCard-${card.tone}`}
                href={card.href}
                target="_blank"
                rel="noreferrer"
                style={
                  {
                    left: card.left,
                    bottom: card.bottom,
                    width: card.width,
                    transform: `translateX(-50%) rotate(${card.rotate})`,
                  } as CSSProperties
                }
              >
                <span className="floatingCardScreen" />
                <strong>{card.title}</strong>
                <p>{card.subtitle}</p>
              </a>
            ))}
          </div>

          <div className="desktopWindows" aria-live="polite">
            {openWindows.map((id, index) => {
              const panel = panels.find((item) => item.id === id);
              if (!panel) {
                return null;
              }

              const depth = openWindows.length - index - 1;

              return (
                <DesktopWindow
                  key={id}
                  panel={panel}
                  depth={depth}
                  onClose={() => closeWindow(id)}
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
                    className="dockItem dockItem-window"
                    onClick={() => openWindow(item.windowId)}
                    aria-label={item.label}
                  >
                    <span>{item.mark}</span>
                  </button>
                );
              }

              const isMailto = item.href.startsWith("mailto:");

              return (
                <a
                  key={item.label}
                  className="dockItem dockItem-link"
                  href={item.href}
                  target={isMailto ? undefined : "_blank"}
                  rel={isMailto ? undefined : "noreferrer"}
                  aria-label={item.label}
                >
                  <span>{item.mark}</span>
                </a>
              );
            })}
          </nav>
        </section>
      )}
    </main>
  );
}
