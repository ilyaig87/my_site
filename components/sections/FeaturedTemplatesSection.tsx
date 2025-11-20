'use client';

import Link from 'next/link';
import Image from 'next/image';
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
    <section className="py-6 bg-gradient-to-b from-white to-yellow-50">
      <Container>
        <div className="text-center mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
            טעימה מהטמפלייטים שלנו
          </h2>
          <p className="text-sm text-gray-600 max-w-2xl mx-auto">
            כל טמפלייט תוכנן בקפידה כדי להתאים לסוג עסק אחר
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
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
        <div className="w-full h-36 rounded-lg mb-2 overflow-hidden relative bg-gradient-to-br from-gray-100 to-gray-200">
          <Image
            src={template.previewImage}
            alt={`תצוגה מקדימה - ${template.name}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            quality={85}
          />

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-2">
            <span className="text-white font-medium text-[10px]">לחץ לצפייה מלאה</span>
          </div>
        </div>

        {/* Template Info */}
        <div>
          <h3 className="text-base font-bold text-gray-900 mb-1 group-hover:text-yellow-600 transition-colors">
            {template.name}
          </h3>
          <p className="text-xs text-gray-600 mb-2 line-clamp-2">
            {template.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-2">
            {template.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-1.5 py-0.5 bg-yellow-50 text-yellow-700 text-[10px] rounded-full border border-yellow-200"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Color Palette Preview */}
          <div className="flex gap-1">
            <div
              className="w-5 h-5 rounded-full"
              style={{ backgroundColor: template.colors.primary }}
              title={template.colors.primary}
            ></div>
            <div
              className="w-5 h-5 rounded-full"
              style={{ backgroundColor: template.colors.secondary }}
              title={template.colors.secondary}
            ></div>
            <div
              className="w-5 h-5 rounded-full"
              style={{ backgroundColor: template.colors.accent }}
              title={template.colors.accent}
            ></div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
