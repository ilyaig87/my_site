import { Template } from '@/types';

interface TemplateHeaderProps {
  template: Template;
}

export default function TemplateHeader({ template }: TemplateHeaderProps) {
  const { colors } = template;

  return (
    <header className="sticky top-0 z-50 shadow-md" style={{ backgroundColor: colors.background }}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xl"
              style={{
                backgroundColor: colors.primary,
                color: '#ffffff'
              }}
            >
              {template.name.charAt(0)}
            </div>
            <span className="text-xl font-bold" style={{ color: colors.primary }}>
              {template.name}
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex gap-8">
            {['בית', 'אודות', 'שירותים', 'צור קשר'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-base font-medium transition-colors hover:opacity-80"
                style={{ color: colors.text }}
              >
                {item}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <button
            className="px-6 py-2 rounded-lg font-semibold transition-all hover:scale-105"
            style={{
              backgroundColor: colors.accent,
              color: '#ffffff'
            }}
          >
            צור קשר
          </button>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" style={{ color: colors.text }}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
