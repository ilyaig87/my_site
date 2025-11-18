'use client';

import Link from 'next/link';
import { useState } from 'react';
import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Template } from '@/types';

interface FeaturedTemplatesSectionProps {
  templates: Template[];
}

export default function FeaturedTemplatesSection({ templates }: FeaturedTemplatesSectionProps) {
  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            טעימה מהטמפלייטים שלנו
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            כל טמפלייט תוכנן בקפידה כדי להתאים לסוג עסק אחר ולהביא תוצאות
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {templates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button href="/templates" size="lg">
            צפה בכל הטמפלייטים
          </Button>
        </div>
      </Container>
    </section>
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
          <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {template.name}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-2">
            {template.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {template.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Color Palette Preview */}
          <div className="flex gap-2">
            <div
              className="w-8 h-8 rounded-full"
              style={{ backgroundColor: template.colors.primary }}
              title={template.colors.primary}
            ></div>
            <div
              className="w-8 h-8 rounded-full"
              style={{ backgroundColor: template.colors.secondary }}
              title={template.colors.secondary}
            ></div>
            <div
              className="w-8 h-8 rounded-full"
              style={{ backgroundColor: template.colors.accent }}
              title={template.colors.accent}
            ></div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
