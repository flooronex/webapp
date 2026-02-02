"use client";

//import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Logo, NavLinks, Actions, MobileMenu } from "./components";
import {
  useNavbarScroll,
  useSliderAnimation,
  useMouseTracking,
  useMobileMenu,
} from "./hooks";
import { navStyles, navLinks, navActions } from "./config";
import { useTranslations } from "next-intl";
//import { useRouter } from "next/navigation";
import { Link, useRouter } from "@/i18n/navigation";


export function Navbar({ className }: { className?: string }) {
  const t = useTranslations("common.navigation");
  const router = useRouter();


  // Hooks
  const scrolled = useNavbarScroll();
  const mobileMenu = useMobileMenu();
  const {
    sliderStyle,
    activeLink,
    navLinksRef,
    handleLinkHover,
    handleLinksMouseLeave,
  } = useSliderAnimation();
  const navRef = useMouseTracking({ onMouseLeaveNav: handleLinksMouseLeave });

  // Logo configuration with light and dark mode images
  const logo = {
    lightImage: "/assets/images/fox_shader.png",
    darkImage: "/assets/images/fox_color.png",
    alt: t("logo"),
  };

  // Resolve translations for links from config
  const links = navLinks.map((link) => ({
    label: t(`links.${link.translationKey}`),
    href: link.href,
  }));

  // Resolve translations for actions from config
  const actions = {
    login: {
      label: t(`actions.${navActions.login.translationKey}`),
      onClick: () => console.log("Login clicked"),
    },
    cta: {
      label: t(`actions.${navActions.cta.translationKey}`),
      onClick: () => router.push("/request-a-quote"),
      variant: navActions.cta.variant,
      // label: t(`actions.${navActions.cta.translationKey}`),
      // onClick: () => console.log("Request a Call clicked"),
      // variant: navActions.cta.variant,
    },
  };

  return (
    <>
      <header className={cn(navStyles.header, className)}>
        <div
          className={cn(
            navStyles.container.base,
            scrolled
              ? navStyles.container.scrolled
              : navStyles.container.default
          )}
        >
          <nav
            ref={navRef}
            className={cn(
              navStyles.nav.base,
              scrolled ? navStyles.nav.scrolled : navStyles.nav.default,
              scrolled
                ? "ease-in delay-0"
                : "[transition-delay:0ms,0ms,0ms,0ms,600ms]"
            )}
          >
            <div
              className={cn(
                navStyles.content.base,
                scrolled
                  ? navStyles.content.scrolled
                  : navStyles.content.default
              )}
            >
              {/* Logo with Light/Dark Mode Images */}
              <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                {/* Light Mode Logo */}
                <Image
                  src={logo.lightImage}
                  alt={logo.alt}
                  width={32}
                  height={32}
                  className="block dark:hidden animate-pulse"
                  priority
                />
                {/* Dark Mode Logo */}
                <Image
                  src={logo.darkImage}
                  alt={logo.alt}
                  width={32}
                  height={32}
                  className="hidden dark:block animate-pulse"
                  priority
                />
                <span className="text-lg font-bold text-slate-900 dark:text-white">
                  FloorOneX™
                </span>
              </Link>

              <div className="w-full h-8" aria-hidden="true" />

              {/* Desktop Navigation Links */}
              <NavLinks
                links={links}
                sliderStyle={sliderStyle}
                activeLink={activeLink}
                navLinksRef={navLinksRef}
                onLinkHover={handleLinkHover}
              />

              <div className="w-full h-8" aria-hidden="true" />

              {/* Actions */}
              <Actions
                scrolled={scrolled}
                actions={actions}
                onMobileMenuOpen={mobileMenu.open}
                mobileMenuLabel={t("mobileMenu.open")}
              />
            </div>
          </nav>
        </div>
      </header>
      <MobileMenu
        isOpen={mobileMenu.isOpen}
        onClose={mobileMenu.close}
        links={links}
        actions={actions}
      />
    </>
  );
}

export default Navbar;
