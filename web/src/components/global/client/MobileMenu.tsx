"use client";
import Link from "next/link";
import { IconHamburger, IconX } from "@/components/icons";
import useMenu from "@/hooks/useMenu";
import { cn } from "@/lib/clx";
import { NAV_LINKS } from "@/constants";
import AuthButtons from "@/components/global/client/AuthButtons";

const MobileMenu: React.FC = () => {
  const { isOpen, toggle } = useMenu();
  return (
    <>
      <button
        type="button"
        className="md:hidden outline-none focus:outline-none bg-transparent"
        onClick={toggle}
      >
        <IconHamburger />
      </button>
      <aside
        className={cn(
          "fixed inset-0 z-999 bg-black/90 min-h-screen transition-all duration-300",
          {
            "translate-x-0": isOpen,
            "translate-x-full": !isOpen,
          }
        )}
      >
        <div className="relative size-full flex flex-col items-center justify-center gap-10">
          <button
            type="button"
            className="outline-none focus:outline-none bg-transparent absolute top-4 right-4"
            onClick={toggle}
          >
            <IconX />
          </button>

          <div className="flex flex-col items-center gap-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-3xl font-medium text-white"
                onClick={toggle}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex gap-2 items-center">
            <AuthButtons />
          </div>
        </div>
      </aside>
    </>
  );
};

export default MobileMenu;
