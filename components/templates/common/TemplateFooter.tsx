import { Template } from '@/types';

interface TemplateFooterProps {
  template: Template;
}

export default function TemplateFooter({ template }: TemplateFooterProps) {
  const { colors } = template;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t" style={{
      backgroundColor: colors.secondary || colors.background,
      borderColor: `${colors.text}20`
    }}>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center font-bold text-2xl"
                style={{
                  backgroundColor: colors.primary,
                  color: '#ffffff'
                }}
              >
                {template.name.charAt(0)}
              </div>
              <h3 className="text-2xl font-bold" style={{ color: colors.primary }}>
                {template.name}
              </h3>
            </div>
            <p className="text-base leading-relaxed mb-4" style={{ color: colors.text, opacity: 0.8 }}>
              {template.description}
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {['facebook', 'instagram', 'linkedin'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                  style={{
                    backgroundColor: `${colors.primary}20`,
                    color: colors.primary
                  }}
                >
                  <span className="text-xl">
                    {social === 'facebook' && 'f'}
                    {social === 'instagram' && 'i'}
                    {social === 'linkedin' && 'in'}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4" style={{ color: colors.primary }}>
              קישורים מהירים
            </h4>
            <nav className="flex flex-col gap-2">
              {['בית', 'אודות', 'שירותים', 'צור קשר'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="transition-opacity hover:opacity-70"
                  style={{ color: colors.text, opacity: 0.8 }}
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-4" style={{ color: colors.primary }}>
              יצירת קשר
            </h4>
            <div className="flex flex-col gap-3 text-sm" style={{ color: colors.text, opacity: 0.8 }}>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>054-6361555</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>ilyaig8@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t text-center" style={{ borderColor: `${colors.text}20` }}>
          <p className="text-sm" style={{ color: colors.text, opacity: 0.7 }}>
            &copy; {currentYear} {template.name}. כל הזכויות שמורות.
          </p>
        </div>
      </div>
    </footer>
  );
}
