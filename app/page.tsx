"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
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
  insight: "https://the-insightmain.vercel.app/",
  insightLRN: "https://insightlrn.vercel.app/",
  insightCreate: "https://insight-create.vercel.app/",
  linkedin: "https://www.linkedin.com/in/christian-hansen-eg-lbg202743465469",
  instagram: "https://www.instagram.com/christian_hansen7/",
  youtube: "https://www.youtube.com/@ChristianHansenTrack",
  email: "mailto:27christianh@wab.edu",
};

type WindowId =
  | "about"
  | "videos"
  | "research"
  | "toolkit"
  | "contact"
  | "insight"
  | "insightlrn"
  | "press"
  | "create";

type AppDefinition = {
  id: WindowId;
  label: string;
  icon: ReactNode;
  size: { width: number; height: number };
  content: ReactNode;
};

type OpenWindow = {
  id: WindowId;
  x: number;
  y: number;
  width: number;
  height: number;
  z: number;
  minimized: boolean;
  maximized: boolean;
};

type ExternalDockLink = {
  label: string;
  href: string;
  icon: ReactNode;
};

type FloatingCard = {
  eyebrow: string;
  title: string;
  subtitle: string;
  caption: string;
  href: string;
  tone: string;
  thumbnail?: string;
};

const MOBILE_BREAKPOINT = 640;

function AppIcon({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`appTile ${className ?? ""}`}>
      <div className="appTileGloss" />
      <span className="appTileInner">{children}</span>
    </div>
  );
}

function AppImageIcon({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <AppIcon className={className}>
      <img src={src} alt={alt} draggable="false" className="appTileImage" />
    </AppIcon>
  );
}

function FolderIcon() {
  return (
    <svg viewBox="0 0 28 22" className="folderGlyph" aria-hidden="true">
      <path d="M2 5a2 2 0 0 1 2-2h6l2.4 2.4H24a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5z" fill="#7cc6ff" />
      <path d="M2 7.4h24V18a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7.4z" fill="#4ea8f5" />
    </svg>
  );
}

function PlayIcon() {
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
      <rect x="3.15" y="3.15" width="17.7" height="17.7" rx="5.2" fill="none" stroke="currentColor" strokeWidth="1.85" />
      <circle cx="12" cy="12" r="4.15" fill="none" stroke="currentColor" strokeWidth="1.85" />
      <circle cx="17.35" cy="6.65" r="1.25" fill="currentColor" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M6.62 8.17a1.95 1.95 0 1 1 0-3.9 1.95 1.95 0 0 1 0 3.9Zm-1.68 1.4h3.36v10.18H4.94V9.57Zm5.26 0h3.22v1.39h.05c.45-.85 1.55-1.74 3.18-1.74 3.4 0 4.03 2.24 4.03 5.14v5.39h-3.36v-4.78c0-1.14-.02-2.61-1.59-2.61-1.6 0-1.84 1.24-1.84 2.52v4.87H10.2V9.57Z" />
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

function WindowSection({
  eyebrow,
  title,
  body,
  action,
  meta,
}: {
  eyebrow: string;
  title: string;
  body: string;
  action?: ReactNode;
  meta: string[];
}) {
  return (
    <div className="windowSection">
      <div className="windowSectionMain">
        <p className="windowEyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p className="windowBodyCopy">{body}</p>
        {action ? <div className="windowActionRow">{action}</div> : null}
      </div>

      <div className="windowSectionMeta">
        {meta.map((item) => (
          <div key={item} className="windowMetaItem">
            <span />
            <p>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const apps: AppDefinition[] = [
  {
    id: "insight",
    label: "The Insight",
    icon: <AppImageIcon src="/os-icons/the-insight.ico" alt="The Insight" className="appTile-site appTile-site-insight" />,
    size: { width: 760, height: 540 },
    content: (
      <WindowSection
        eyebrow="Publishing ecosystem"
        title="The Insight"
        body="Student essays, research, interviews, podcasts, and public-facing editorial work built into one serious archive."
        action={
          <a className="windowLinkButton" href={links.insight} target="_blank" rel="noreferrer">
            Visit The Insight ↗
          </a>
        }
        meta={[
          "Essays, long-form research, interviews, and publishing.",
          "A live ecosystem rather than a generic portfolio section.",
          "The public editorial home for Christian Hansen.",
        ]}
      />
    ),
  },
  {
    id: "insightlrn",
    label: "InsightLRN",
    icon: <AppImageIcon src="/os-icons/insightlrn.svg" alt="InsightLRN" className="appTile-site appTile-site-lrn" />,
    size: { width: 760, height: 520 },
    content: (
      <WindowSection
        eyebrow="Learning tools"
        title="InsightLRN"
        body="Flashcards, notes, review systems, libraries, exams, and analytics for durable academic performance."
        action={
          <a className="windowLinkButton" href={links.insightLRN} target="_blank" rel="noreferrer">
            Open InsightLRN ↗
          </a>
        }
        meta={[
          "Retrieval practice and study architecture.",
          "Built around useful academic systems, not content clutter.",
          "A serious product inside the wider Insight ecosystem.",
        ]}
      />
    ),
  },
  {
    id: "press",
    label: "Press",
    icon: <AppIcon className="appTile-folder"><FolderIcon /></AppIcon>,
    size: { width: 720, height: 500 },
    content: (
      <WindowSection
        eyebrow="Articles and publishing"
        title="Press"
        body="A compact place for featured essays, interviews, and writing from the Insight publishing layer."
        action={
          <a className="windowLinkButton" href={`${links.insight}articles`} target="_blank" rel="noreferrer">
            Open articles ↗
          </a>
        }
        meta={[
          "Featured essays and editorial outputs.",
          "Press-style archive rather than a generic blog grid.",
          "Connected directly to The Insight site.",
        ]}
      />
    ),
  },
  {
    id: "create",
    label: "Insight Create",
    icon: <AppImageIcon src="/os-icons/insight-create.ico" alt="Insight Create" className="appTile-site appTile-site-create" />,
    size: { width: 760, height: 520 },
    content: (
      <WindowSection
        eyebrow="Builder / creative lab"
        title="Insight Create"
        body="Web projects, launch pages, systems work, and experiments that drive the execution layer behind the ecosystem."
        action={
          <a className="windowLinkButton" href={links.insightCreate} target="_blank" rel="noreferrer">
            Open Insight Create ↗
          </a>
        }
        meta={[
          "Launch pages, systems, and design execution.",
          "The operating layer behind real products and rollouts.",
          "Built for shipping, iteration, and refinement.",
        ]}
      />
    ),
  },
  {
    id: "about",
    label: "About Christian",
    icon: <AppIcon className="appTile-portrait">CH</AppIcon>,
    size: { width: 680, height: 470 },
    content: (
      <WindowSection
        eyebrow="About"
        title="Christian Hansen"
        body="Founder of The Insight, builder of publishing and learning systems, and student operator across writing, research, and athletics."
        action={
          <Link className="windowLinkButton" href="/about">
            Read profile ↗
          </Link>
        }
        meta={[
          "Publishing, research, education tools, and media.",
          "Built as an ecosystem, not disconnected portfolio pages.",
          "Designed to feel like a personal operating system.",
        ]}
      />
    ),
  },
  {
    id: "videos",
    label: "Videos",
    icon: <AppIcon className="appTile-youtube"><PlayIcon /></AppIcon>,
    size: { width: 720, height: 500 },
    content: (
      <WindowSection
        eyebrow="YouTube"
        title="Christian Hansen Track"
        body="Track performances and related video outputs from Christian's YouTube account."
        action={
          <a className="windowLinkButton" href={links.youtube} target="_blank" rel="noreferrer">
            Open YouTube ↗
          </a>
        }
        meta={[
          "Track videos and performance clips.",
          "A direct route to the public video archive.",
          "Used in the dock as the main video surface.",
        ]}
      />
    ),
  },
  {
    id: "research",
    label: "Research",
    icon: <AppIcon className="appTile-research">RS</AppIcon>,
    size: { width: 690, height: 470 },
    content: (
      <WindowSection
        eyebrow="Research"
        title="Economics, policy, and serious inquiry"
        body="Live research areas across economics, externalities, policy, and deeper writing questions worth developing."
        meta={[
          "Economics EE and policy-oriented work.",
          "Research themes that feed into essays and publication.",
          "A working space rather than a final archive.",
        ]}
      />
    ),
  },
  {
    id: "toolkit",
    label: "Toolkit",
    icon: <AppIcon className="appTile-toolkit">TK</AppIcon>,
    size: { width: 700, height: 500 },
    content: (
      <WindowSection
        eyebrow="Toolkit"
        title="Systems stack"
        body="Projects, tools, and infrastructure across GitHub, Vercel, publishing, notes, and execution workflows."
        action={
          <Link className="windowLinkButton" href="/projects">
            Open toolkit ↗
          </Link>
        }
        meta={[
          "Operational layer behind the visible products.",
          "Publishing, build, and organization systems.",
          "Structured for speed and reuse.",
        ]}
      />
    ),
  },
  {
    id: "contact",
    label: "Contact",
    icon: <AppIcon className="appTile-contact"><MailIcon /></AppIcon>,
    size: { width: 620, height: 430 },
    content: (
      <WindowSection
        eyebrow="Contact"
        title="Reach Christian"
        body="Direct contact routes for editorial, collaboration, media, and project conversations."
        action={
          <a className="windowLinkButton" href={links.email}>
            Email Christian ↗
          </a>
        }
        meta={[
          "Email for direct contact.",
          "LinkedIn, Instagram, and YouTube live in the dock.",
          "Kept compact and useful.",
        ]}
      />
    ),
  },
];

const appMap = Object.fromEntries(apps.map((app) => [app.id, app])) as Record<WindowId, AppDefinition>;
const desktopApps = ["insight", "insightlrn", "press", "create"].map((id) => appMap[id as WindowId]);
const dockAppIds: WindowId[] = ["about", "videos", "research", "toolkit", "contact"];

const externalDockLinks: ExternalDockLink[] = [
  { label: "LinkedIn", href: links.linkedin, icon: <LinkedInIcon /> },
  { label: "Instagram", href: links.instagram, icon: <InstagramIcon /> },
  { label: "YouTube", href: links.youtube, icon: <PlayIcon /> },
];

const floatingCards: FloatingCard[] = [
  {
    eyebrow: "YouTube",
    title: "APAC RECORD | 800m | 1:58.51",
    subtitle: "Race recap, pacing, and championship finish.",
    caption: "Video highlights the full 800m performance and split strategy.",
    href: "https://www.youtube.com/watch?v=dMm1Nal7dvc",
    tone: "youtube",
    thumbnail: "https://i.ytimg.com/vi/dMm1Nal7dvc/hqdefault.jpg",
  },
  {
    eyebrow: "Website",
    title: "The Insight",
    subtitle: "Student essays, reporting, and research.",
    caption: "A public editorial home for long-form student writing and analysis.",
    href: links.insight,
    tone: "insight",
  },
  {
    eyebrow: "YouTube",
    title: "Open | 400m | 51.54",
    subtitle: "Race film, splits, and tactical execution.",
    caption: "A featured video from APAC 2026 with post-race commentary.",
    href: "https://www.youtube.com/watch?v=59jjq70Q2jQ",
    tone: "youtube",
    thumbnail: "https://i.ytimg.com/vi/59jjq70Q2jQ/hqdefault.jpg",
  },
  {
    eyebrow: "Website",
    title: "InsightLRN",
    subtitle: "Review systems, flashcards, and study architecture.",
    caption: "Academic tools built for durable learning and exam preparation.",
    href: links.insightLRN,
    tone: "lrn",
  },
  {
    eyebrow: "YouTube",
    title: "SMR | 400m Split | 50.10",
    subtitle: "Relay footage, training insight, and performance data.",
    caption: "A video breakdown of a competitive split from APAC 2026.",
    href: "https://www.youtube.com/watch?v=MZsRR05oTaA",
    tone: "youtube",
    thumbnail: "https://i.ytimg.com/vi/MZsRR05oTaA/hqdefault.jpg",
  },
  {
    eyebrow: "Website",
    title: "Insight Create",
    subtitle: "Launch design, systems, and execution.",
    caption: "The project layer for new pages, workflows, and creative systems.",
    href: links.insightCreate,
    tone: "create",
  },
  {
    eyebrow: "Profile",
    title: "LinkedIn",
    subtitle: "Christian Hansen.",
    caption: "Professional background, editorial connections, and public proof.",
    href: links.linkedin,
    tone: "linkedin",
  },
  {
    eyebrow: "Profile",
    title: "Instagram",
    subtitle: "christian_hansen7",
    caption: "Visual updates and behind-the-scenes work from the ecosystem.",
    href: links.instagram,
    tone: "instagram",
  },
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

function createWindow(id: WindowId, existingCount: number): OpenWindow {
  const app = appMap[id];
  const viewportWidth = typeof window === "undefined" ? app.size.width : window.innerWidth;
  const viewportHeight = typeof window === "undefined" ? app.size.height : window.innerHeight;
  const width = Math.min(app.size.width, viewportWidth - 48);
  const height = Math.min(app.size.height, viewportHeight - 140);
  const offset = (existingCount % 5) * 30;

  return {
    id,
    x: Math.max(20, (viewportWidth - width) / 2 + offset - 60),
    y: Math.max(48, (viewportHeight - height) / 2 - 30 + offset),
    width,
    height,
    z: existingCount + 11,
    minimized: false,
    maximized: false,
  };
}

function HelloWord() {
  return <div className="heroMark">christian hansen</div>;
}

function DesktopWindow({
  app,
  windowState,
  focused,
  mobile,
  onFocus,
  onClose,
  onMinimize,
  onToggleMax,
  onMove,
}: {
  app: AppDefinition;
  windowState: OpenWindow;
  focused: boolean;
  mobile: boolean;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onToggleMax: () => void;
  onMove: (x: number, y: number) => void;
}) {
  const dragRef = useRef<{ dx: number; dy: number } | null>(null);

  if (mobile) {
    return (
      <motion.div
        className="windowSheet"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        onPointerDown={onFocus}
      >
        <WindowBar app={app} focused onClose={onClose} onMinimize={onMinimize} onToggleMax={onToggleMax} mobile />
        <div className="windowScroll">{app.content}</div>
      </motion.div>
    );
  }

  const style: CSSProperties = windowState.maximized
    ? {
      left: 12,
      top: 14,
      width: "calc(100vw - 24px)",
      height: "calc(100vh - 108px)",
      zIndex: windowState.z,
    }
    : {
      left: windowState.x,
      top: windowState.y,
      width: windowState.width,
      height: windowState.height,
      zIndex: windowState.z,
    };

  return (
    <motion.div
      className={`desktopWindow${focused ? " desktopWindow-focused" : ""}`}
      style={style}
      initial={{ opacity: 0, scale: 0.82, y: 26 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 26 }}
      transition={{ duration: 0.42, ease: [0.34, 1.4, 0.5, 1] }}
      onPointerDown={onFocus}
    >
      <div
        className="windowBarDrag"
        onPointerDown={(event) => {
          if (windowState.maximized) {
            return;
          }

          onFocus();
          dragRef.current = {
            dx: event.clientX - windowState.x,
            dy: event.clientY - windowState.y,
          };
          (event.target as HTMLElement).setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (!dragRef.current) {
            return;
          }

          const maxX = window.innerWidth - 120;
          const maxY = window.innerHeight - 80;
          onMove(
            Math.min(Math.max(event.clientX - dragRef.current.dx, -(windowState.width - 120)), maxX),
            Math.min(Math.max(event.clientY - dragRef.current.dy, 12), maxY),
          );
        }}
        onPointerUp={(event) => {
          dragRef.current = null;
          (event.target as HTMLElement).releasePointerCapture?.(event.pointerId);
        }}
        onDoubleClick={onToggleMax}
      >
        <WindowBar app={app} focused={focused} onClose={onClose} onMinimize={onMinimize} onToggleMax={onToggleMax} />
      </div>

      <div className="windowScroll">{app.content}</div>
    </motion.div>
  );
}

function WindowBar({
  app,
  focused,
  onClose,
  onMinimize,
  onToggleMax,
  mobile = false,
}: {
  app: AppDefinition;
  focused: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onToggleMax: () => void;
  mobile?: boolean;
}) {
  return (
    <div className={`windowBar${focused ? " windowBar-focused" : ""}`}>
      <div className="windowTraffic">
        <button
          type="button"
          aria-label="Close"
          onClick={(event) => {
            event.stopPropagation();
            onClose();
          }}
          className="trafficButton trafficClose"
        />
        <button
          type="button"
          aria-label="Minimize"
          onClick={(event) => {
            event.stopPropagation();
            onMinimize();
          }}
          className="trafficButton trafficMinimize"
        />
        <button
          type="button"
          aria-label="Zoom"
          onClick={(event) => {
            event.stopPropagation();
            onToggleMax();
          }}
          className="trafficButton trafficExpand"
        />
      </div>

      <div className="windowBarTitle">{app.label}</div>
      <div className="windowBarSpacer">{mobile ? <span /> : null}</div>
    </div>
  );
}

function DockButton({
  label,
  running,
  onClick,
  href,
  icon,
  innerRef,
}: {
  label: string;
  running?: boolean;
  onClick?: () => void;
  href?: string;
  icon: ReactNode;
  innerRef?: (node: HTMLDivElement | null) => void;
}) {
  const body = (
    <>
      <span className="dockTooltip">{label}</span>
      <div ref={innerRef} className="dockIconWrap">
        {icon}
      </div>
      <span className={`dockDot${running ? " dockDot-visible" : ""}`} />
    </>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className="dockButton">
        {body}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className="dockButton">
      {body}
    </button>
  );
}

export default function Home() {
  const [openWindows, setOpenWindows] = useState<OpenWindow[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [locked, setLocked] = useState(true);
  const [unlocking, setUnlocking] = useState(false);
  const [showFloatingCards, setShowFloatingCards] = useState(false);
  const [now, setNow] = useState(new Date());
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const zRef = useRef(10);
  const dockRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const updateNow = () => setNow(new Date());
    updateNow();
    const intervalId = window.setInterval(updateNow, 5_000);
    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
    const sync = () => setIsMobile(mediaQuery.matches);
    sync();
    mediaQuery.addEventListener("change", sync);
    return () => mediaQuery.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (isMobile || locked) {
      return;
    }

    const timeoutId = window.setTimeout(() => setShowFloatingCards(true), 3400);
    return () => window.clearTimeout(timeoutId);
  }, [isMobile, locked]);

  useEffect(() => {
    const unlock = () => {
      setUnlocking(true);
      window.setTimeout(() => setLocked(false), 650);
    };

    const onWheel = (event: WheelEvent) => {
      if (event.deltaY < -8 && locked) {
        unlock();
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (["ArrowUp", "Enter", " "].includes(event.key) && locked) {
        unlock();
      }

      if (event.key === "Escape") {
        setOpenWindows((current) => {
          const visible = current.filter((item) => !item.minimized);
          if (!visible.length) {
            return current;
          }

          const top = visible.reduce((highest, item) => (item.z > highest.z ? item : highest));
          return current.filter((item) => item.id !== top.id);
        });
      }
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [locked]);

  const timeLabel = useMemo(() => formatTime(now), [now]);
  const dateLabel = useMemo(() => formatDate(now), [now]);
  const carouselCards = useMemo(() => [...floatingCards, ...floatingCards], []);

  const openWindow = (id: WindowId) => {
    setOpenWindows((current) => {
      const existing = current.find((item) => item.id === id);
      zRef.current += 1;

      if (existing) {
        return current.map((item) =>
          item.id === id
            ? {
              ...item,
              minimized: false,
              z: zRef.current,
            }
            : item,
        );
      }

      return [...current, { ...createWindow(id, current.length), z: zRef.current }];
    });
  };

  const focusWindow = (id: WindowId) => {
    zRef.current += 1;
    setOpenWindows((current) => current.map((item) => (item.id === id ? { ...item, z: zRef.current } : item)));
  };

  const closeWindow = (id: WindowId) => setOpenWindows((current) => current.filter((item) => item.id !== id));

  const minimizeWindow = (id: WindowId) =>
    setOpenWindows((current) => current.map((item) => (item.id === id ? { ...item, minimized: true } : item)));

  const toggleMaximize = (id: WindowId) =>
    setOpenWindows((current) =>
      current.map((item) => (item.id === id ? { ...item, maximized: !item.maximized, z: zRef.current + 1 } : item)),
    );

  const moveWindow = (id: WindowId, x: number, y: number) =>
    setOpenWindows((current) => current.map((item) => (item.id === id ? { ...item, x, y } : item)));

  const topZ = openWindows.reduce((highest, item) => Math.max(highest, item.z), 0);
  const openIds = new Set(openWindows.map((item) => item.id));
  const visibleWindows = openWindows.filter((item) => !item.minimized);

  return (
    <main className="osRoot">
      <div className="auroraBackground" aria-hidden="true">
        <div className="auroraBlob auroraBlob-1" />
        <div className="auroraBlob auroraBlob-2" />
        <div className="auroraBlob auroraBlob-3" />
        <div className="auroraBlob auroraBlob-4" />
        <div className="auroraShade" />
      </div>
      <div className="grainOverlay" aria-hidden="true" />

      {locked ? (
        <div
          className={`lockOverlay${unlocking ? " lockOverlay-hidden" : ""}`}
          onPointerDown={() => {
            setUnlocking(true);
            window.setTimeout(() => setLocked(false), 650);
          }}
          onClick={() => {
            setUnlocking(true);
            window.setTimeout(() => setLocked(false), 650);
          }}
          onTouchStart={(event) => setTouchStartY(event.touches[0]?.clientY ?? null)}
          onTouchEnd={(event) => {
            if (touchStartY === null) {
              return;
            }

            const endY = event.changedTouches[0]?.clientY ?? touchStartY;
            if (touchStartY - endY > 40) {
              setUnlocking(true);
              window.setTimeout(() => setLocked(false), 650);
            }
            setTouchStartY(null);
          }}
        >
          <div className="lockContent">
            <svg width="26" height="30" viewBox="0 0 26 30" fill="none" className="lockIcon" aria-hidden="true">
              <rect x="3" y="13" width="20" height="15" rx="4" fill="currentColor" />
              <path d="M7 13v-4a6 6 0 0 1 12 0v4" stroke="currentColor" strokeWidth="2.4" fill="none" />
            </svg>
            <div className="lockTime">{timeLabel}</div>
            <div className="lockDate">{dateLabel}</div>
          </div>

          <div className="lockHint">
            <div className="lockArrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </div>
            <span>Swipe up · click · or press ↑ to enter</span>
            <div className="lockBar" />
          </div>
        </div>
      ) : null}

      {!isMobile && !locked ? (
        <div className="heroIntro">
          <HelloWord />
          <p>I&apos;m Christian Hansen — student builder, publisher, and systems thinker.</p>
          <span>CLICK AN ICON TO EXPLORE — OR USE THE DOCK BELOW</span>
        </div>
      ) : null}

      {!isMobile && !locked ? (
        <div className={`floatingCardDeck${showFloatingCards ? " floatingCardDeck-visible" : ""}`}>
          <div className="floatingCardCarousel">
            <motion.div
              className="floatingCardTrack"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 28, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              {carouselCards.map((card, index) => (
                <a
                  key={`${card.title}-${index}`}
                  href={card.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`floatingCard floatingCard-${card.tone}`}
                >
                  <div className="floatingCardTag">{card.eyebrow}</div>
                  <div
                    className="floatingCardFrame"
                    style={card.thumbnail ? { backgroundImage: `url(${card.thumbnail})` } : undefined}
                  />
                  <div className="floatingCardInfo">
                    <strong>{card.title}</strong>
                    <p>{card.subtitle}</p>
                    <span className="floatingCardCaption">{card.caption}</span>
                  </div>
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      ) : null}

      {isMobile ? (
        <div className="mobileDesktop">
          <div className="mobileHero">
            <HelloWord />
            <p>I&apos;m Christian Hansen — student builder, publisher, and systems thinker.</p>
          </div>
          <div className="mobileApps">
            {desktopApps.map((app) => (
              <button key={app.id} type="button" className="desktopIconButton" onClick={() => openWindow(app.id)}>
                <span className="desktopIconVisual">{app.icon}</span>
                <span className="desktopIconLabel">{app.label}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="desktopRail">
          {desktopApps.map((app) => (
            <button key={app.id} type="button" className="desktopIconButton" onClick={() => openWindow(app.id)}>
              <span className="desktopIconVisual">{app.icon}</span>
              <span className="desktopIconLabel">{app.label}</span>
            </button>
          ))}
        </div>
      )}

      <AnimatePresence>
        {visibleWindows.map((windowState) => (
          <DesktopWindow
            key={windowState.id}
            app={appMap[windowState.id]}
            windowState={windowState}
            focused={windowState.z === topZ}
            mobile={isMobile}
            onFocus={() => focusWindow(windowState.id)}
            onClose={() => closeWindow(windowState.id)}
            onMinimize={() => minimizeWindow(windowState.id)}
            onToggleMax={() => toggleMaximize(windowState.id)}
            onMove={(x, y) => moveWindow(windowState.id, x, y)}
          />
        ))}
      </AnimatePresence>

      <div className="dockWrap">
        <div
          className="dockGlass"
          onPointerMove={(event: ReactPointerEvent<HTMLDivElement>) => {
            const x = event.clientX;
            dockRefs.current.forEach((node) => {
              if (!node) {
                return;
              }

              const rect = node.getBoundingClientRect();
              const distance = x - (rect.left + rect.width / 2);
              const scale = 1 + 0.6 * Math.exp(-(distance * distance) / 9800);
              node.style.transform = `translateY(${-(26 * (scale - 1))}px) scale(${scale})`;
            });
          }}
          onPointerLeave={() => {
            dockRefs.current.forEach((node) => {
              if (node) {
                node.style.transform = "translateY(0) scale(1)";
              }
            });
          }}
        >
          {dockAppIds.map((id, index) => {
            const app = appMap[id];
            return (
              <DockButton
                key={id}
                label={app.label}
                running={openIds.has(id)}
                onClick={() => openWindow(id)}
                icon={app.icon}
                innerRef={(node) => {
                  dockRefs.current[index] = node;
                }}
              />
            );
          })}

          <div className="dockDivider" />

          {externalDockLinks.map((item, index) => (
            <DockButton
              key={item.label}
              label={item.label}
              href={item.href}
              icon={<AppIcon className={`appTile-social appTile-social-${item.label.toLowerCase()}`}>{item.icon}</AppIcon>}
              innerRef={(node) => {
                dockRefs.current[dockAppIds.length + index] = node;
              }}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
