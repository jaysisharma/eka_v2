"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import {
  Menu,
  X,
  ChevronDown,
  Search,
  User,
  BookOpen,
  Users,
  LayoutGrid,
  Zap,
  Globe,
  Calendar,
  Microscope,
  Award,
  Info,
  Mail,
  Briefcase,
  GraduationCap,
  Sparkles,
} from "lucide-react";

interface NavLink {
  name: string;
  href: string;
  icon?: any;
  dropdown?: {
    name: string;
    href: string;
    icon: any;
  }[];
}

const NAV_LINKS: NavLink[] = [
  { name: "Home", href: "/" },

  {
    name: "Research",
    href: "/research",
    dropdown: [
      {
        name: "Papers",
        href: "/research/papers",
        icon: BookOpen,
      },
      {
        name: "Researchers",
        href: "/researchers",
        icon: Users,
      },
    ],
  },

  { name: "Projects", href: "/projects" },

  {
    name: "Opportunities",
    href: "/opportunities",
    dropdown: [
      {
        name: "Vacancies",
        href: "/opportunities/vacancies",
        icon: Briefcase,
      },
      {
        name: "Mentorships",
        href: "/opportunities/mentorships",
        icon: Sparkles,
      },
    ],
  },

  { name: "Gallery", href: "/gallery" },
  { name: "News", href: "/news" },
  { name: "Store", href: "/store" },

  {
    name: "About",
    href: "/about",
    dropdown: [
      {
        name: "Mission",
        href: "/about/mission",
        icon: Info,
      },
      {
        name: "Team",
        href: "/about/team",
        icon: Users,
      },
      {
        name: "Contact",
        href: "/about/contact",
        icon: Mail,
      },
    ],
  },
];

export function Navbar() {
  const { data: session } = useSession();

  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);

  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);

  const [activeDropdown, setActiveDropdown] =
    useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const isHiddenPage = useMemo(() => {
    return (
      [
        "/login",
        "/signup",
        "/verify-otp",
        "/forgot-password",
        "/reset-password",
      ].includes(pathname) ||
      pathname.startsWith("/portal") ||
      pathname.startsWith("/admin")
    );
  }, [pathname]);

  const handleScroll = useCallback(() => {
    const nextScrolled = window.scrollY > 20;

    setIsScrolled((prev) =>
      prev !== nextScrolled ? nextScrolled : prev
    );
  }, []);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target as Node
        )
      ) {
        setActiveDropdown(null);
      }
    },
    []
  );

  useEffect(() => {
    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      }
    );

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, [handleScroll, handleClickOutside]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen
      ? "hidden"
      : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  if (isHiddenPage) return null;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? "py-3 bg-[#020617]/95 border-b border-white/10"
          : "py-5 bg-transparent"
        }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group shrink-0"
        >
          <div className="relative w-9 h-9 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 border border-white/10">
            <img
              src="/logo.png"
              alt="EKA Logo"
              className="w-full h-full object-contain"
              loading="lazy"
            />
          </div>

          <span className="text-lg font-black tracking-tighter text-white uppercase hidden sm:block">
            Eka{" "}
            <span className="text-[#BA9F59]">
              Research
            </span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div
          className="hidden lg:flex items-center gap-1 xl:gap-2"
          ref={dropdownRef}
        >
          {NAV_LINKS.map((link) => (
            <div
              key={link.name}
              className="relative group"
            >
              {link.dropdown ? (
                <button
                  type="button"
                  onMouseEnter={() =>
                    setActiveDropdown(link.name)
                  }
                  className={`px-2.5 py-2 text-[11px] font-bold uppercase tracking-widest flex items-center gap-1 transition-colors ${activeDropdown === link.name || isActive(link.href)
                      ? "text-[#BA9F59]"
                      : "text-[#94a3b8] hover:text-white"
                    }`}
                >
                  {link.name}

                  <ChevronDown
                    className={`w-3 h-3 transition-transform duration-300 ${activeDropdown === link.name
                        ? "rotate-180"
                        : ""
                      }`}
                  />
                </button>
              ) : (
                <Link
                  href={link.href}
                  className={`px-2.5 py-2 text-[11px] font-bold uppercase tracking-widest transition-colors ${isActive(link.href)
                      ? "text-[#BA9F59]"
                      : "text-[#94a3b8] hover:text-white"
                    }`}
                >
                  {link.name}
                </Link>
              )}

              {/* Dropdown */}
              {link.dropdown && (
                <div
                  className={`absolute top-full left-0 mt-1 w-60 border border-white/10 bg-[#0f172a] shadow-2xl transition-all duration-200 origin-top-left ${activeDropdown === link.name
                      ? "opacity-100 scale-100 translate-y-0"
                      : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                    }`}
                  onMouseLeave={() =>
                    setActiveDropdown(null)
                  }
                >
                  <div className="p-2 space-y-1">
                    {link.dropdown.map((sub) => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        className={`flex items-center gap-3 px-4 py-3 text-[13px] font-medium transition-all border-l-2 ${pathname === sub.href
                            ? "text-white bg-white/5 border-[#BA9F59]"
                            : "text-[#94a3b8] hover:text-white hover:bg-white/5 border-transparent hover:border-[#BA9F59]"
                          }`}
                      >
                        <sub.icon className={`w-4 h-4 ${pathname === sub.href ? "text-[#BA9F59]" : "text-[#BA9F59]/70"}`} />
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-4">

          <button className="p-2 text-[#94a3b8] hover:text-white transition-colors hidden md:block">
            <Search className="w-5 h-5" />
          </button>

          <Link
            href={
              session
                ? "/portal/dashboard"
                : "/login"
            }
            className="flex items-center gap-2 pl-2 pr-4 py-1.5 bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
          >
            <div className="w-7 h-7 bg-[#BA9F59] flex items-center justify-center">
              <User className="text-[#020617] w-4 h-4" />
            </div>

            <span className="text-[11px] font-bold text-white uppercase tracking-wider hidden sm:inline">
              {session
                ? "Dashboard"
                : "Login"}
            </span>
          </Link>

          {/* Mobile Toggle */}
          <button
            type="button"
            className="lg:hidden p-2 text-white"
            onClick={() =>
              setIsMobileMenuOpen(
                (prev) => !prev
              )
            }
          >
            {isMobileMenuOpen ? (
              <X />
            ) : (
              <Menu />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[60] bg-[#020617] transition-transform duration-300 lg:hidden ${isMobileMenuOpen
            ? "translate-x-0"
            : "translate-x-full pointer-events-none"
          }`}
      >
        <div className="p-6 flex flex-col h-full overflow-y-auto">

          <div className="flex items-center justify-between mb-12">
            <span className="text-2xl font-black tracking-tighter text-white uppercase">
              Eka{" "}
              <span className="text-[#BA9F59]">
                Research
              </span>
            </span>

            <button
              type="button"
              onClick={() =>
                setIsMobileMenuOpen(false)
              }
              className="text-white"
            >
              <X className="w-8 h-8" />
            </button>
          </div>

          <div className="space-y-6">
            {NAV_LINKS.map((link) => (
              <div key={link.name}>
                {link.dropdown ? (
                  <div className="space-y-4">

                    <span className="text-xs font-black uppercase tracking-[0.3em] text-[#BA9F59]/50 block">
                      {link.name}
                    </span>

                    <div className="grid grid-cols-1 gap-4 pl-4">
                      {link.dropdown.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          onClick={() =>
                            setIsMobileMenuOpen(
                              false
                            )
                          }
                          className="text-xl font-bold text-white flex items-center gap-3"
                        >
                          <sub.icon className="w-5 h-5 text-[#BA9F59]" />
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    onClick={() =>
                      setIsMobileMenuOpen(false)
                    }
                    className={`text-2xl font-bold block transition-colors ${isActive(link.href)
                        ? "text-[#BA9F59]"
                        : "text-white"
                      }`}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div className="mt-auto pt-12">
            <button className="w-full py-4 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest flex items-center justify-center gap-3 rounded-sm">
              <Search className="w-5 h-5" />
              Search Research
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}