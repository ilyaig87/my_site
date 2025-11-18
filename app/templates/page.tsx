'use client';

import Link from 'next/link';
import { useState } from 'react';
import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';
import { getAllTemplates } from '@/lib/data';
import { Template } from '@/types';

export default function TemplatesPage() {
  const templates = getAllTemplates();

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-32 md:py-48" style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-cyan-900/85 to-blue-800/90"></div>

        <Container className="relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            {/* Animated Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full glass border border-white/20 text-white/90 text-sm font-medium animate-pulse">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-ping"></span>
              <span>12 טמפלייטים מקצועיים</span>
            </div>

            {/* Title with Gradient */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
              <span className="inline-block bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent drop-shadow-2xl">
                גלריית הטמפלייטים
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-2xl md:text-3xl font-bold mb-8 bg-gradient-to-r from-blue-300 via-cyan-300 to-sky-300 bg-clip-text text-transparent drop-shadow-lg">
              עיצובים מקצועיים לכל סוג עסק
            </p>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-100 mb-12 leading-relaxed max-w-3xl mx-auto drop-shadow font-light">
              בחר טמפלייט מוכן, התאם אותו למותג שלך והעלה לאוויר תוך ימים ספורים
            </p>
          </div>
        </Container>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 left-10 w-[600px] h-[600px] bg-cyan-500 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

function TemplateCard({ template }: { template: Template }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={`/templates/${template.slug}`}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card hover className="h-full">
        {/* Template Preview Image */}
        <div className="w-full h-64 rounded-lg mb-4 overflow-hidden relative bg-gradient-to-br from-gray-100 to-gray-200">
          <img
            src={template.previewImage}
            alt={`תצוגה מקדימה - ${template.name}`}
            className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
          />

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
            <span className="text-white font-medium text-sm">לחץ לצפייה מלאה</span>
          </div>
        </div>

        {/* Template Info */}
        <div>
          {/* Category Badge */}
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full mb-3">
            {getCategoryLabel(template.category)}
          </span>

          <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {template.name}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-2">
            {template.description}
          </p>

          {/* Suitable For */}
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2 font-medium">מתאים ל:</p>
            <p className="text-sm text-gray-600">{template.suitableFor.slice(0, 3).join(' • ')}</p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {template.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Color Palette */}
          <div className="flex gap-2 items-center">
            <span className="text-sm text-gray-500 ml-2">צבעים:</span>
            <div
              className="w-6 h-6 rounded-full border-2 border-gray-200"
              style={{ backgroundColor: template.colors.primary }}
              title={template.colors.primary}
            ></div>
            <div
              className="w-6 h-6 rounded-full border-2 border-gray-200"
              style={{ backgroundColor: template.colors.secondary }}
              title={template.colors.secondary}
            ></div>
            <div
              className="w-6 h-6 rounded-full border-2 border-gray-200"
              style={{ backgroundColor: template.colors.accent }}
              title={template.colors.accent}
            ></div>
          </div>
        </div>
      </Card>
    </Link>
  );
}

function getCategoryLabel(category: string): string {
  const labels: { [key: string]: string } = {
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
