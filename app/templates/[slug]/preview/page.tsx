import { notFound } from 'next/navigation';
import { getTemplateBySlug, getAllTemplateSlugs } from '@/lib/data';
import TemplateRenderer from '@/components/templates/TemplateRenderer';
import { Metadata } from 'next';

interface PreviewPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllTemplateSlugs();
  return slugs;
}

export async function generateMetadata({ params }: PreviewPageProps): Promise<Metadata> {
  const { slug } = await params;
  const template = getTemplateBySlug(slug);

  if (!template) {
    return {
      title: 'תצוגה מקדימה - טמפלייט לא נמצא',
    };
  }

  return {
    title: `תצוגה מקדימה - ${template.name}`,
    description: template.description,
  };
}

export default async function PreviewPage({ params }: PreviewPageProps) {
  const { slug } = await params;
  const template = getTemplateBySlug(slug);

  if (!template) {
    notFound();
  }

  return (
    <div className="min-h-screen" style={{
      backgroundColor: template.colors.background,
      color: template.colors.text
    }}>
      <TemplateRenderer template={template} />
    </div>
  );
}
