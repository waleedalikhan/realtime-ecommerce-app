import Link from "next/link";
import AuthButtons from "@/components/global/client/AuthButtons";
import MobileMenu from "@/components/global/client/MobileMenu";
import { NAV_LINKS } from "@/constants";

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-stone-800/50 bg-[#0c0c0f]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="md:text-xl text-sm font-semibold tracking-tight text-white"
        >
          Realtime Commerce
        </Link>
        <nav className="flex items-center gap-1">
          <div className="md:flex hidden items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-4 py-2 text-sm font-medium text-stone-400 transition hover:bg-stone-800/60 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <span className="mx-2 h-4 w-px bg-stone-700 md:inline hidden" />
          <div className="md:flex hidden gap-2">
            <AuthButtons />
          </div>
          <MobileMenu />
        </nav>
      </div>
    </header>
  );
};

export default Header;
