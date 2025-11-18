import { Template } from '@/types';
import ClassicBusiness from './ClassicBusiness';
import ModernCoach from './ModernCoach';
import MinimalPortfolio from './MinimalPortfolio';
import EventLanding from './EventLanding';
import RealEstate from './RealEstate';
import MedicalClinic from './MedicalClinic';
import FitnessStudio from './FitnessStudio';
import Restaurant from './Restaurant';
import Photographer from './Photographer';
import MiniShop from './MiniShop';
import Lawyer from './Lawyer';
import CreativeAgency from './CreativeAgency';

interface TemplateRendererProps {
  template: Template;
}

export default function TemplateRenderer({ template }: TemplateRendererProps) {
  // Render the appropriate template component based on the template ID
  switch (template.id) {
    case 'classic-business':
      return <ClassicBusiness template={template} />;
    case 'modern-coach':
      return <ModernCoach template={template} />;
    case 'minimal-portfolio':
      return <MinimalPortfolio template={template} />;
    case 'event-landing':
      return <EventLanding template={template} />;
    case 'real-estate':
      return <RealEstate template={template} />;
    case 'medical-clinic':
      return <MedicalClinic template={template} />;
    case 'fitness-studio':
      return <FitnessStudio template={template} />;
    case 'restaurant':
      return <Restaurant template={template} />;
    case 'photographer':
      return <Photographer template={template} />;
    case 'mini-shop':
      return <MiniShop template={template} />;
    case 'lawyer':
      return <Lawyer template={template} />;
    case 'creative-agency':
      return <CreativeAgency template={template} />;
    default:
      return <DefaultTemplate template={template} />;
  }
}

// Default template if specific template is not implemented
function DefaultTemplate({ template }: { template: Template }) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: template.colors.background }}>
      <div style={{ backgroundColor: template.colors.primary }} className="py-20 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">{template.name}</h1>
          <p className="text-xl">{template.description}</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-16">
        <p className="text-lg text-gray-600 mb-8">{template.longDescription}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {template.features.map((feature, idx) => (
            <div key={idx} className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2" style={{ color: template.colors.primary }}>
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
