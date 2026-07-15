'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { getNavItems, getServicesMenu } from '@/lib/data';
import Button from '@/components/ui/Button';
import GlassToggle from '@/components/ui/GlassToggle';
import Container from '@/components/ui/Container';
import { cn } from '@/lib/cn';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false); // default = light
  const navItems = getNavItems();
  const servicesMenu = getServicesMenu();
  const pathname = usePathname();

  const handleHomeClick = (href: string) => (e: React.MouseEvent) => {
    if (href === '/' && pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const dark = localStorage.getItem('darkMode') === 'true';
    setIsDark(dark);
    document.documentElement.classList.toggle('dark', dark);
  }, []);

  const toggleDarkMode = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('darkMode', String(next));
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-[var(--bg-elevated)]/90 backdrop-blur-xl border-b border-[var(--border)]'
            : 'bg-gradient-to-b from-[var(--bg-elevated)]/70 to-transparent'
        )}
      >
        <Container>
          {/* Constant height — scrolling only changes the backdrop, never the size,
              so the header doesn't visibly "jump" right after page load. */}
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Logo — large, presence */}
            <Link href="/" onClick={handleHomeClick('/')} className="flex items-center group">
              <Image
                src="/images/logo/pixelia_logo_color.png"
                alt="Pixelia"
                // The logo asset is a 1024×1024 square. With object-contain it
                // only ever paints at its rendered height (40–56px), so declare
                // the real intrinsic box and request a 56px variant instead of
                // letting a `fill` layout pull a multi-hundred-px image.
                width={56}
                height={56}
                sizes="56px"
                priority
                className="object-contain w-auto h-12 md:h-14"
              />
            </Link>

            {/* Desktop nav — bigger tabs */}
            <nav className="hidden lg:flex items-center gap-5 xl:gap-6 absolute left-1/2 -translate-x-1/2">
              {navItems.map((item) =>
                item.href === '/services' ? (
                  // "שירותים" opens a dropdown with the niche & area landing
                  // pages; the label itself still navigates to /services.
                  // State-driven (not CSS :hover) so keyboard focus works too.
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                    onFocus={() => setServicesOpen(true)}
                    onBlur={(e) => {
                      if (!e.currentTarget.contains(e.relatedTarget as Node)) setServicesOpen(false);
                    }}
                  >
                    <Link
                      href={item.href}
                      aria-expanded={servicesOpen}
                      className="relative flex items-center gap-1 text-[14px] xl:text-[15px] font-normal text-[var(--text-default)] hover:text-[var(--text-strong)] transition-colors group whitespace-nowrap"
                    >
                      <span>{item.label}</span>
                      <svg
                        className={cn('w-3 h-3 mt-0.5 transition-transform duration-200', servicesOpen && 'rotate-180')}
                        fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                      <span className="absolute inset-x-0 -bottom-1.5 h-px bg-[var(--accent)] origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                    </Link>

                    {/* pt-3 bridges the hover gap between the tab and the panel */}
                    <div
                      className={cn(
                        'absolute top-full right-1/2 translate-x-1/2 pt-3 transition-all duration-200 z-50',
                        servicesOpen ? 'visible opacity-100 translate-y-0' : 'invisible opacity-0 translate-y-1'
                      )}
                    >
                      <div className="w-72 p-4 rounded-2xl bg-[var(--bg-elevated)]/95 backdrop-blur-xl border border-[var(--border)] shadow-[0_20px_50px_-20px_rgba(14,20,32,0.35)] text-right">
                        {servicesMenu.groups.map((group) => (
                          <div key={group.title} className="mb-3 last:mb-0">
                            <p className="text-[11px] font-bold text-[var(--text-faint)] uppercase tracking-wide mb-1.5 px-2">
                              {group.title}
                            </p>
                            <ul>
                              {group.links.map((link) => (
                                <li key={link.href}>
                                  <Link
                                    href={link.href}
                                    className="block px-2 py-1.5 rounded-lg text-[13px] text-[var(--text-default)] hover:text-[var(--text-strong)] hover:bg-[var(--ink)]/[0.05] transition-colors"
                                  >
                                    {link.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                        <div className="mt-2 pt-2 border-t border-[var(--border)]">
                          <Link
                            href={servicesMenu.overview.href}
                            className="block px-2 py-1.5 rounded-lg text-[13px] font-semibold text-[var(--primary)] hover:bg-[var(--ink)]/[0.05] transition-colors"
                          >
                            {servicesMenu.overview.label}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={handleHomeClick(item.href)}
                    className="relative text-[14px] xl:text-[15px] font-normal text-[var(--text-default)] hover:text-[var(--text-strong)] transition-colors group whitespace-nowrap"
                  >
                    <span>{item.label}</span>
                    <span className="absolute inset-x-0 -bottom-1.5 h-px bg-[var(--accent)] origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  </Link>
                )
              )}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <div className="block">
                <GlassToggle isDark={isDark} onToggle={toggleDarkMode} />
              </div>
              <div className="hidden md:block">
                <Button href="/contact" size="sm" variant="primary">
                  בואו נדבר
                </Button>
              </div>

              {/* Mobile burger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden w-10 h-10 flex items-center justify-center text-[var(--text-strong)] border border-[var(--border-strong)] rounded-lg hover:bg-white/5 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Spacer */}
      <div className="h-20 md:h-24" aria-hidden="true" />

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden bg-[var(--bg-base)]"
          >
            <motion.nav
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } },
              }}
              className="relative z-10 h-full flex flex-col justify-center px-8 pt-20 pb-12"
            >
              <div className="flex flex-col gap-5 max-w-md mx-auto w-full text-center overflow-y-auto">
                {navItems.map((item) => (
                  <motion.div
                    key={item.href}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      show: { opacity: 1, y: 0 },
                    }}
                  >
                    {item.href === '/services' ? (
                      <>
                        <div className="flex items-center justify-center gap-2">
                          <Link
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block text-xl font-medium text-[var(--text-strong)] hover:text-[var(--accent)] transition-colors tracking-tight"
                          >
                            {item.label}
                          </Link>
                          <button
                            onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                            aria-label={mobileServicesOpen ? 'סגירת רשימת השירותים' : 'פתיחת רשימת השירותים'}
                            aria-expanded={mobileServicesOpen}
                            className="w-8 h-8 flex items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-muted)]"
                          >
                            <svg
                              className={cn('w-4 h-4 transition-transform duration-200', mobileServicesOpen && 'rotate-180')}
                              fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                        </div>
                        <AnimatePresence initial={false}>
                          {mobileServicesOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="overflow-hidden"
                            >
                              <div className="pt-3 flex flex-col gap-2.5">
                                {servicesMenu.groups.flatMap((g) => g.links).map((link) => (
                                  <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block text-base text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
                                  >
                                    {link.label}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={(e) => {
                          handleHomeClick(item.href)(e);
                          setMobileMenuOpen(false);
                        }}
                        className="block text-xl font-medium text-[var(--text-strong)] hover:text-[var(--accent)] transition-colors tracking-tight"
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.div>
                ))}

                <motion.div
                  variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                  className="pt-8 mt-4 flex flex-col items-center gap-6 border-t border-[var(--border)]"
                >
                  <GlassToggle isDark={isDark} onToggle={toggleDarkMode} />
                  <div onClick={() => setMobileMenuOpen(false)}>
                    <Button href="/contact" variant="primary" size="lg">
                      בואו נדבר
                    </Button>
                  </div>
                </motion.div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
