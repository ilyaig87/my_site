import { Template } from '@/types';
import TemplateHeader from './common/TemplateHeader';
import TemplateFooter from './common/TemplateFooter';

export default function MinimalPortfolio({ template }: { template: Template }) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: template.colors.background }}>
      <TemplateHeader template={template} />
      <section className="py-32 text-center">
        <h1 className="text-8xl font-light mb-8" style={{ color: template.colors.primary, fontFamily: template.typography.headingFont }}>
          אמנות בעדשה
        </h1>
        <p className="text-xl" style={{ color: template.colors.accent }}>צלם | אמן דיגיטלי</p>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80',
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&q=80',
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80',
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80',
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80',
          ].map((image, idx) => (
            <div key={idx} className="aspect-square bg-gray-200 hover:opacity-80 transition-opacity cursor-pointer overflow-hidden">
              <img src={image} alt={`Portfolio ${idx + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-4xl font-light mb-6" style={{ color: template.colors.primary }}>
            אודות
          </h2>
          <p className="text-lg leading-relaxed" style={{ color: template.colors.text }}>
            צלם מקצועי עם למעלה מ-10 שנות ניסיון. מתמחה בצילומי פורטרט, אירועים וטבע.
          </p>
        </div>
      </section>

      <section className="py-16 text-center" style={{ backgroundColor: template.colors.primary }}>
        <h3 className="text-3xl font-light mb-4 text-white">בואו ניצור ביחד</h3>
        <a href="/contact" className="inline-block px-8 py-3 bg-white text-black hover:bg-gray-100 transition-colors">
          צרו קשר
        </a>
      </section>

      <TemplateFooter template={template} />
    </div>
  );
}
