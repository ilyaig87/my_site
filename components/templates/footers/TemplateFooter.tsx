import { Template } from '@/types';

interface TemplateFooterProps {
  template: Template;
  variant?: 'minimal' | 'professional' | 'creative' | 'modern';
}

export default function TemplateFooter({ template, variant = 'professional' }: TemplateFooterProps) {
  const currentYear = new Date().getFullYear();
  const { colors } = template;

  if (variant === 'minimal') {
    return (
      <footer className="py-12" style={{ backgroundColor: colors.secondary }}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm" style={{ color: colors.text, opacity: 0.7 }}>
            © {currentYear} כל הזכויות שמורות
          </p>
        </div>
      </footer>
    );
  }

  if (variant === 'modern') {
    return (
      <footer
        className="relative py-16 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
        }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">
                אודות
              </h3>
              <p className="text-white/80 text-sm leading-relaxed">
                אנחנו מספקים שירות מקצועי ואיכותי ללקוחותינו
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 text-white">
                קישורים
              </h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/80 hover:text-white text-sm transition-colors">בית</a></li>
                <li><a href="#" className="text-white/80 hover:text-white text-sm transition-colors">שירותים</a></li>
                <li><a href="#" className="text-white/80 hover:text-white text-sm transition-colors">צור קשר</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 text-white">
                צור קשר
              </h3>
              <p className="text-white/80 text-sm">
                📞 050-1234567<br />
                ✉️ info@example.com
              </p>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8">
            <p className="text-center text-white/60 text-sm">
              © {currentYear} כל הזכויות שמורות
            </p>
          </div>
        </div>
      </footer>
    );
  }

  if (variant === 'creative') {
    return (
      <footer className="relative py-20" style={{ backgroundColor: colors.secondary }}>
        <div className="absolute inset-0" style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1557683316-973673baf926?w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.05,
        }}></div>

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4" style={{ color: colors.primary }}>
              בואו נעבוד ביחד
            </h2>
            <p className="text-lg opacity-80" style={{ color: colors.text }}>
              מחכים לשמוע מכם ולהתחיל בפרויקט המשותף
            </p>
          </div>

          <div className="flex justify-center gap-6 mb-12">
            <div className="w-12 h-12 rounded-full flex items-center justify-center transition-transform hover:scale-110" style={{ backgroundColor: colors.primary }}>
              <span className="text-white text-xl">f</span>
            </div>
            <div className="w-12 h-12 rounded-full flex items-center justify-center transition-transform hover:scale-110" style={{ backgroundColor: colors.primary }}>
              <span className="text-white text-xl">in</span>
            </div>
            <div className="w-12 h-12 rounded-full flex items-center justify-center transition-transform hover:scale-110" style={{ backgroundColor: colors.primary }}>
              <span className="text-white text-xl">@</span>
            </div>
          </div>

          <p className="text-center text-sm opacity-60" style={{ color: colors.text }}>
            © {currentYear} כל הזכויות שמורות
          </p>
        </div>
      </footer>
    );
  }

  // Professional (default)
  return (
    <footer className="py-16" style={{ backgroundColor: colors.primary, color: '#ffffff' }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">
              החברה שלנו
            </h3>
            <p className="text-white/80 leading-relaxed mb-4">
              אנחנו מתמחים במתן שירות מקצועי ואיכותי ללקוחותינו. הצוות שלנו מחויב למצוינות ושביעות רצון מלאה.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">קישורים מהירים</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">דף הבית</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">אודות</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">שירותים</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">צור קשר</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">יצירת קשר</h4>
            <ul className="space-y-2 text-white/80">
              <li>📍 תל אביב, ישראל</li>
              <li>📞 050-1234567</li>
              <li>✉️ info@example.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 text-center">
          <p className="text-white/60 text-sm">
            © {currentYear} כל הזכויות שמורות
          </p>
        </div>
      </div>
    </footer>
  );
}
