'use client';

import { ReactNode } from 'react';
import { trackWhatsAppClick } from '@/lib/ga';

interface WhatsAppLinkProps {
  href: string;
  /** GA4 label for which button was clicked ('footer', 'contact_card', ...). */
  location: string;
  className?: string;
  ariaLabel?: string;
  children: ReactNode;
}

/**
 * Plain external <a> to WhatsApp that reports a whatsapp_click GA4 event.
 * Lets server components (footer, contact page) keep conversion tracking
 * without becoming client components themselves.
 */
export default function WhatsAppLink({ href, location, className, ariaLabel, children }: WhatsAppLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={ariaLabel}
      onClick={() => trackWhatsAppClick(location)}
    >
      {children}
    </a>
  );
}
