import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowRight, Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Explore", path: "/explore" },
  { name: "About", path: "/about" },
];

// Works locally ("/") and on GitHub Pages ("/learnspherehub/")
const logoSrc = `${import.meta.env.BASE_URL}logo.png`;

// Inline spacing so global CSS resets can't override it
const space = {
  nav: { padding: "0 32px", maxWidth: 1280, margin: "0 auto" },
  capsule: { padding: 5, gap: 4 },
  link: { padding: "9px 22px" },
  logoBox: { padding: 8, boxSizing: "border-box" },
  cta: { padding: "11px 20px 11px 24px" },
  mobileLink: { padding: "14px 18px" },
  mobileCta: { padding: "14px 24px" },
  toggle: { padding: 0 },
};

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pill, setPill] = useState({ left: 0, width: 0, visible: false });

  const listRef = useRef(null);
  const { pathname } = useLocation();

  // Glass bar only once the page has scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Sliding pill follows the active link
  useLayoutEffect(() => {
    const measure = () => {
      const list = listRef.current;
      const active = list?.querySelector('[aria-current="page"]');
      if (!list || !active) {
        setPill((p) => ({ ...p, visible: false }));
        return;
      }
      setPill({
        left: active.offsetLeft,
        width: active.offsetWidth,
        visible: true,
      });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [pathname]);

  // Close mobile menu on navigation
  useEffect(() => setIsOpen(false), [pathname]);

  // Escape to close, close on desktop resize, lock body scroll
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && setIsOpen(false);
    const onResize = () => window.innerWidth >= 768 && setIsOpen(false);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  const focusRing =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black";

  const ctaClasses = `group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-violet-600 to-indigo-500 text-[13px] font-semibold text-white ring-1 ring-inset ring-white/20 shadow-lg shadow-violet-600/25 transition-all hover:shadow-xl hover:shadow-violet-500/35 hover:brightness-110 active:scale-[0.98] ${focusRing}`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled || isOpen
          ? "border-white/[0.08] bg-black/70 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label="Main"
        style={space.nav}
        className="flex h-[72px] w-full items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr]"
      >
        {/* Logo in dimmed purple square + project name */}
        <Link
          to="/"
          aria-label="LearnSphereHub home"
          className={`flex min-w-0 items-center gap-2.5 justify-self-start rounded-xl ${focusRing}`}
        >
          <span
            style={space.logoBox}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-600/25 ring-1 ring-inset ring-violet-400/25"
          >
            <img
              src={logoSrc}
              alt=""
              className="h-full w-full object-contain"
            />
          </span>
          <span className="truncate text-base font-semibold tracking-tight text-white">
            LearnSphere
            <span className="bg-gradient-to-r from-violet-400 to-indigo-300 bg-clip-text text-transparent">
              Hub
            </span>
          </span>
        </Link>

        {/* Desktop links: centered capsule with glowing sliding pill */}
        <div
          ref={listRef}
          style={space.capsule}
          className="relative hidden items-center rounded-full border border-white/10 bg-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md md:flex"
        >
          <span
            aria-hidden="true"
            style={{
              transform: `translateX(${pill.left}px)`,
              width: pill.width,
              opacity: pill.visible ? 1 : 0,
              top: 5,
              bottom: 5,
              left: 0,
            }}
            className="pointer-events-none absolute rounded-full bg-gradient-to-b from-violet-500/35 to-violet-600/15 shadow-[0_0_18px_rgba(139,92,246,0.3)] ring-1 ring-inset ring-violet-300/30 transition-[transform,width,opacity] duration-300 ease-out motion-reduce:transition-none"
          />

          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              style={space.link}
              className={({ isActive }) =>
                `relative z-10 rounded-full text-[13px] font-medium tracking-tight transition-colors ${focusRing} ${
                  isActive ? "text-white" : "text-gray-400 hover:text-white"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden justify-self-end md:block">
          <Link to="/learn" style={space.cta} className={ctaClasses}>
            {/* shine sweep on hover */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-white/25 blur-md transition-all duration-700 group-hover:left-[150%] motion-reduce:hidden"
            />
            <span className="relative">Start learning</span>
            <ArrowRight
              size={15}
              className="relative transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          style={space.toggle}
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-gray-300 transition-colors hover:bg-white/10 hover:text-white md:hidden ${focusRing}`}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`grid transition-[grid-template-rows,visibility] duration-300 ease-out motion-reduce:transition-none md:hidden ${
          isOpen ? "visible grid-rows-[1fr]" : "invisible grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div
            style={{ padding: "16px 32px 24px", gap: 6 }}
            className="mx-auto flex max-w-7xl flex-col border-t border-white/[0.08]"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/"}
                style={space.mobileLink}
                className={({ isActive }) =>
                  `flex items-center justify-between rounded-2xl text-[15px] font-medium transition-colors ${focusRing} ${
                    isActive
                      ? "bg-gradient-to-r from-violet-500/20 to-transparent text-white ring-1 ring-inset ring-violet-400/20"
                      : "text-gray-400 hover:bg-white/[0.05] hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.9)]" />
                    )}
                  </>
                )}
              </NavLink>
            ))}

            <Link
              to="/learn"
              style={{ ...space.mobileCta, marginTop: 12 }}
              className={`${ctaClasses} w-full`}
            >
              <span className="relative">Start learning</span>
              <ArrowRight
                size={15}
                className="relative transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;