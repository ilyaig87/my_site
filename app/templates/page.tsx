'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';
import { getAllTemplates } from '@/lib/data';
import { Template } from '@/types';
import { useTemplateStats } from '@/hooks/useTemplateStats';

export default function TemplatesPage() {
  const templates = getAllTemplates();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Get unique categories
  const categories = useMemo(() => {
    const cats = templates.map(t => t.category);
    return ['all', ...Array.from(new Set(cats))];
  }, [templates]);

  // Filter templates
  const filteredTemplates = useMemo(() => {
    return templates.filter(template => {
      const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
      const matchesSearch = searchQuery === '' ||
        template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [templates, selectedCategory, searchQuery]);

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 md:py-32 bg-gradient-to-b from-yellow-50 to-white">
        <Container className="relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            {/* Animated Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 mb-8 rounded-full bg-white border-2 border-yellow-300 text-gray-900 text-sm font-bold shadow-lg animate-bounce">
              <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full animate-pulse"></span>
              <span>{templates.length} טמפלייטים מקצועיים</span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight text-gray-900">
              גלריית הטמפלייטים
            </h1>

            {/* Subtitle */}
            <p className="text-2xl md:text-3xl font-bold mb-6 text-yellow-600">
              עיצובים מקצועיים לכל סוג עסק
            </p>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              בחר טמפלייט מוכן, התאם אותו למותג שלך והעלה לאוויר תוך ימים ספורים
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="חפש טמפלייט..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 pr-12 rounded-2xl border-2 border-gray-200 focus:border-yellow-400 focus:outline-none text-lg text-gray-900 placeholder-gray-400 shadow-sm transition-all"
                />
                <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-yellow-400 text-gray-900 shadow-lg scale-105'
                      : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-yellow-300 hover:shadow-md'
                  }`}
                >
                  {getCategoryLabel(category)}
                </button>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Custom Design CTA */}
      <section className="py-16 bg-white border-y-2 border-gray-200">
        <Container>
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-yellow-50 to-white border-2 border-yellow-200 rounded-3xl p-8 md:p-12 shadow-xl">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-400 rounded-2xl mb-6 shadow-lg">
                  <svg className="w-10 h-10 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                  רוצים משהו מיוחד יותר?
                </h2>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
                  הטמפלייטים שלנו הם נקודת התחלה מעולה, אבל אנחנו גם יכולים לעצב לכם אתר מותאם אישית לחלוטין שמשקף בדיוק את המותג והחזון שלכם
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-gray-900">התאמה מלאה</h3>
                  </div>
                  <p className="text-gray-600 text-sm">עיצוב שמותאם בדיוק לצרכים ולמותג שלכם</p>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13 7H7v6h6V7z" />
                        <path fillRule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-gray-900">פונקציות ייחודיות</h3>
                  </div>
                  <p className="text-gray-600 text-sm">תכונות מיוחדות שמתאימות בדיוק לעסק שלכם</p>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-gray-900">אין הגבלות</h3>
                  </div>
                  <p className="text-gray-600 text-sm">חופש מלא לממש כל רעיון ועיצוב</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-yellow-400 text-gray-900 rounded-xl font-bold hover:bg-yellow-500 transition-all shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <span>בואו נדבר על עיצוב אישי</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <button
                  onClick={() => {
                    document.querySelector('#templates-grid')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-xl font-bold border-2 border-gray-900 hover:bg-gray-900 hover:text-white transition-all"
                >
                  <span>או המשיכו לעיין בטמפלייטים</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Templates Grid */}
      <section id="templates-grid" className="py-16 md:py-24 bg-white">
        <Container>
          {/* Results Count */}
          <div className="mb-8 text-center">
            <p className="text-gray-600 text-lg">
              נמצאו <span className="font-bold text-yellow-600">{filteredTemplates.length}</span> טמפלייטים
            </p>
          </div>

          {filteredTemplates.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">לא נמצאו טמפלייטים</h3>
              <p className="text-gray-600 mb-6">נסה לשנות את הסינון או החיפוש</p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="px-6 py-3 bg-yellow-400 text-gray-900 rounded-xl font-bold hover:bg-yellow-500 transition-colors"
              >
                אפס סינונים
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTemplates.map((template, index) => (
                <TemplateCard key={template.id} template={template} index={index} />
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}

function TemplateCard({ template, index }: { template: Template; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const { stats } = useTemplateStats(template.slug);

  return (
    <Link
      href={`/templates/${template.slug}`}
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
      }}
    >
      <div className="h-full bg-white rounded-2xl border-2 border-gray-200 overflow-hidden transition-all duration-300 group-hover:border-yellow-400 group-hover:shadow-2xl group-hover:-translate-y-2">
        {/* Template Preview Image */}
        <div className="relative w-full h-72 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
          <img
            src={template.previewImage}
            alt={`תצוגה מקדימה - ${template.name}`}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
          />

          {/* Category Badge - Floating */}
          <div className="absolute top-4 right-4">
            <span className="inline-block px-4 py-2 bg-white/95 backdrop-blur-sm text-gray-900 text-xs font-bold rounded-full shadow-lg border border-gray-200">
              {getCategoryLabel(template.category)}
            </span>
          </div>

          {/* Hover Overlay with CTA */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-end pb-8">
            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <div className="px-6 py-3 bg-yellow-400 text-gray-900 rounded-xl font-bold shadow-xl flex items-center gap-2">
                <span>צפה בטמפלייט</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Popularity Badge - Based on real data */}
          {stats?.isPopular && (
            <div className="absolute top-4 left-4">
              <div className="px-3 py-1.5 bg-yellow-400 text-gray-900 text-xs font-bold rounded-full shadow-lg flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>פופולרי</span>
              </div>
            </div>
          )}

          {/* View Count Badge */}
          {stats && stats.views30d > 0 && (
            <div className="absolute bottom-4 left-4">
              <div className="px-3 py-1.5 bg-black/70 backdrop-blur-sm text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>{stats.views30d} צפיות החודש</span>
              </div>
            </div>
          )}
        </div>

        {/* Template Info */}
        <div className="p-6">
          <h3 className="text-2xl font-black text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors">
            {template.name}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
            {template.description}
          </p>

          {/* Suitable For - Compact */}
          <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-500 mb-1.5 font-bold uppercase tracking-wide">מתאים במיוחד ל</p>
            <p className="text-sm text-gray-700 font-medium">{template.suitableFor.slice(0, 2).join(' • ')}</p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {template.tags.slice(0, 4).map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-yellow-50 text-yellow-700 text-xs font-semibold rounded-full border border-yellow-200"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Color Palette - Enhanced */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 font-bold uppercase tracking-wide">פלטת צבעים</span>
              <div className="flex gap-2">
                <div
                  className="w-8 h-8 rounded-lg border-2 border-gray-300 shadow-sm transition-transform group-hover:scale-110"
                  style={{ backgroundColor: template.colors.primary }}
                  title={template.colors.primary}
                ></div>
                <div
                  className="w-8 h-8 rounded-lg border-2 border-gray-300 shadow-sm transition-transform group-hover:scale-110"
                  style={{ backgroundColor: template.colors.secondary }}
                  title={template.colors.secondary}
                ></div>
                <div
                  className="w-8 h-8 rounded-lg border-2 border-gray-300 shadow-sm transition-transform group-hover:scale-110"
                  style={{ backgroundColor: template.colors.accent }}
                  title={template.colors.accent}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Link>
  );
}

function getCategoryLabel(category: string): string {
  const labels: { [key: string]: string } = {
    all: 'הכל',
    business: 'עסקי',
    landing: 'דף נחיתה',
    portfolio: 'פורטפוליו',
    medical: 'רפואי',
    fitness: 'כושר',
    restaurant: 'מסעדה',
    professional: 'מקצועי',
    creative: 'קריאייטיב',
    ecommerce: 'חנות',
  };
  return labels[category] || category;
}
