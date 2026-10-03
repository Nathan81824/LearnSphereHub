import { Link } from "react-router-dom";
import { BookOpen, ArrowUpRight } from "lucide-react";

function Footer() {
const currentYear = new Date().getFullYear();

return ( <footer className="border-t border-white/10 bg-black"> <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8"> <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4"> <div className="lg:col-span-2"> <Link to="/" className="inline-flex items-center gap-3"> <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600"> <BookOpen size={21} /> </div>


          <span className="text-lg font-bold tracking-tight">
            LearnSphere<span className="text-violet-400">Hub</span>
          </span>
        </Link>

        <p className="mt-5 max-w-md text-sm leading-7 text-gray-400">
          Learn anything you want, at your own pace. Explore new subjects,
          build useful skills, and turn your curiosity into knowledge.
        </p>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-white">Platform</h3>

        <ul className="mt-5 space-y-3">
          <li>
            <Link
              to="/"
              className="text-sm text-gray-400 transition-colors hover:text-white"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              to="/explore"
              className="text-sm text-gray-400 transition-colors hover:text-white"
            >
              Explore
            </Link>
          </li>

          <li>
            <Link
              to="/learn"
              className="text-sm text-gray-400 transition-colors hover:text-white"
            >
              Start Learning
            </Link>
          </li>

          <li>
            <Link
              to="/about"
              className="text-sm text-gray-400 transition-colors hover:text-white"
            >
              About
            </Link>
          </li>
        </ul>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-white">Learning</h3>

        <ul className="mt-5 space-y-3">
          <li>
            <Link
              to="/learn"
              className="inline-flex items-center gap-1 text-sm text-gray-400 transition-colors hover:text-white"
            >
              Learn Something New
              <ArrowUpRight size={14} />
            </Link>
          </li>

          <li>
            <Link
              to="/explore"
              className="text-sm text-gray-400 transition-colors hover:text-white"
            >
              Explore Topics
            </Link>
          </li>

          <li>
            <a
              href="#"
              className="text-sm text-gray-400 transition-colors hover:text-white"
            >
              Learning Paths
            </a>
          </li>

          <li>
            <a
              href="#"
              className="text-sm text-gray-400 transition-colors hover:text-white"
            >
              Practice & Quizzes
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
      <p>© {currentYear} LearnSphereHub. All rights reserved.</p>

      <div className="flex gap-6">
        <a
          href="#"
          className="transition-colors hover:text-white"
        >
          Privacy
        </a>

        <a
          href="#"
          className="transition-colors hover:text-white"
        >
          Terms
        </a>
      </div>
    </div>
  </div>
</footer>


);
}

export default Footer;
