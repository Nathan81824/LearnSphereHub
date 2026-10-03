import { useEffect, useState } from "react";
import { ArrowRight, Search, Sparkles } from "lucide-react";
import heroVideo from "../assets/viedios/hero-background.mp4";

const QUICK_TOPICS = ["Mathematics", "React", "Astronomy"];

function SearchBar({ topic, setTopic, inputRef, onSubmit }) {
  return (
    <form
      onSubmit={onSubmit}
      className="w-full rounded-2xl border border-white/10 bg-black/40 shadow-2xl shadow-black/40 backdrop-blur-md"
      style={{ padding: 8, boxSizing: "border-box" }}
    >
      <div className="flex w-full flex-col gap-2 sm:flex-row">
        <label
          className="flex min-w-0 flex-1 items-center gap-3 rounded-xl bg-white/[0.06]"
          style={{ padding: "0 18px" }}
        >
          <Search size={18} className="shrink-0 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="What do you want to learn?"
            aria-label="Topic to learn"
            className="w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
            style={{ padding: "16px 0" }}
          />
        </label>

        <button
          type="submit"
          className="flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-violet-600 text-sm font-semibold text-white transition hover:bg-violet-500 sm:w-auto"
          style={{ padding: "16px 30px" }}
        >
          <span>Start Learning</span>
          <ArrowRight size={17} />
        </button>
      </div>
    </form>
  );
}

function Hero({ topic, setTopic, inputRef, onSubmit }) {
  const [showVideo, setShowVideo] = useState(false);

  // Skip the video for reduced-motion users and data-saver connections
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const saveData = navigator.connection?.saveData;
    setShowVideo(!reduceMotion && !saveData);
  }, []);

  return (
    <section
      className="relative isolate flex w-full items-center overflow-hidden"
      style={{
        height: "100svh",
        maxHeight: "100svh",
        boxSizing: "border-box",
        paddingTop: 72, // navbar height
        paddingBottom: 24,
      }}
    >
      {/* BACKGROUND VIDEO */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[#070707]">
        {showVideo && (
          <video
            className="h-full w-full object-cover"
            src={heroVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        )}
        <div className="absolute inset-0 bg-[#070707]/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.25),transparent_60%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#070707] to-transparent" />
      </div>

      {/* CONTENT */}
      <div
        className="mx-auto w-full max-w-5xl text-center"
        style={{
          boxSizing: "border-box",
          padding: "0 clamp(20px, 4vw, 32px)",
        }}
      >
        <div
          className="inline-flex max-w-full items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 text-xs text-violet-300 backdrop-blur-sm sm:text-sm"
          style={{ padding: "8px 16px", marginBottom: "clamp(16px, 3vh, 28px)" }}
        >
          <Sparkles size={14} className="shrink-0" />
          <span>AI-powered learning</span>
        </div>

        <h1
          className="mx-auto max-w-5xl font-bold leading-[0.98] tracking-[-0.045em] text-white"
          style={{ fontSize: "clamp(2.5rem, min(8vw, 11vh), 6.5rem)" }}
        >
          Learn anything.
          <br />
          <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
            Become anything.
          </span>
        </h1>

        <p
          className="mx-auto w-full max-w-2xl text-sm leading-7 text-gray-300 sm:text-base sm:leading-8 lg:text-lg"
          style={{ marginTop: "clamp(16px, 3vh, 28px)", padding: "0 8px" }}
        >
          LearnSphereHub turns any topic into a structured learning experience
          with AI-powered lessons, practice, quizzes, and progress tracking.
        </p>

        <div
          className="mx-auto w-full max-w-2xl"
          style={{ marginTop: "clamp(24px, 4vh, 40px)" }}
        >
          <SearchBar
            topic={topic}
            setTopic={setTopic}
            inputRef={inputRef}
            onSubmit={onSubmit}
          />

          <div
            className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-gray-500 sm:text-sm"
            style={{ marginTop: 16, padding: "0 8px" }}
          >
            <span>Try</span>
            {QUICK_TOPICS.map((name, i) => (
              <span key={name} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden="true">·</span>}
                <button
                  type="button"
                  onClick={() => setTopic(name)}
                  className="text-gray-300 transition hover:text-violet-400"
                >
                  {name}
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;