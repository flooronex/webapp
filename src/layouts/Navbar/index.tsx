"use client";

import { cn } from "@/lib/utils";
import { Logo, NavLinks, Actions, MobileMenu } from "./components";
import {
  useNavbarScroll,
  useSliderAnimation,
  useMouseTracking,
  useMobileMenu,
} from "./hooks";
import { navStyles, navLinks, navActions } from "./config";
import { IconRocket } from "@tabler/icons-react";
import { useTranslations } from "next-intl";

export function Navbar({ className }: { className?: string }) {
  const t = useTranslations("common.navigation");

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

  // Navbar configuration using translations
  const logo = {
    icon: <IconRocket className="w-5 h-5 min-w-5 min-h-5" />,
    text: t("logo"),
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
      onClick: () => console.log("CTA clicked"),
      variant: navActions.cta.variant,
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
              {/* Logo */}
              <Logo icon={logo.icon} text={logo.text} />

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
