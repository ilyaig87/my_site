'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { getNavItems } from '@/lib/data';
import Button from '@/components/ui/Button';
import GlassToggle from '@/components/ui/GlassToggle';
import Container from '@/components/ui/Container';
import { cn } from '@/lib/cn';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const navItems = getNavItems();
  const pathname = usePathname();

  const handleHomeClick = (href: string) => (e: React.MouseEvent) => {
    if (href === '/' && pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem('darkMode');
    const dark = stored === null ? true : stored === 'true';
    setIsDark(dark);
    document.documentElement.classList.toggle('dark', dark);
  }, []);

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

  const toggleDarkMode = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('darkMode', String(next));
  };

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
          <div className={cn('flex items-center justify-between transition-all duration-300', scrolled ? 'h-16 md:h-18' : 'h-20 md:h-24')}>
            {/* Logo — large, presence */}
            <Link href="/" onClick={handleHomeClick('/')} className="flex items-center group">
              <div className={cn('relative transition-all duration-300', scrolled ? 'h-10 w-32 md:h-12 md:w-36' : 'h-12 w-36 md:h-14 md:w-44')}>
                <Image
                  src="/images/logo/pixelia_logo_color.png"
                  alt="Pixelia"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Desktop nav — bigger tabs */}
            <nav className="hidden lg:flex items-center gap-7 absolute left-1/2 -translate-x-1/2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleHomeClick(item.href)}
                  className="relative text-[15px] font-normal text-[var(--text-default)] hover:text-[var(--text-strong)] transition-colors group whitespace-nowrap"
                >
                  <span>{item.label}</span>
                  <span className="absolute inset-x-0 -bottom-1.5 h-px bg-[var(--accent)] origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:block">
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
              <div className="flex flex-col gap-5 max-w-md mx-auto w-full text-center">
                {navItems.map((item) => (
                  <motion.div
                    key={item.href}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      show: { opacity: 1, y: 0 },
                    }}
                  >
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
