import Image from 'next/image';
import Container from '@/components/ui/Container';

interface Project {
  name: string;
  url: string;
  domain: string;
  tagline: string;
  description: string;
  image: string;
  highlights: string[];
  tags: string[];
}

const projects: Project[] = [
  {
    name: 'חן שעיה - שירותי כמאות',
    url: 'https://www.chenshaya.com/',
    domain: 'chenshaya.com',
    tagline: 'אתר תדמית לחברת כמאות והנדסה',
    description:
      'אתר תדמית מקצועי לחברה המתמחה בחישובי כמויות, כתבי מכרזים וניתוחי מחיר עבור פרויקטים בבנייה. עיצוב נקי ומכובד שמדגיש מקצועיות ואמינות.',
    image: '/images/projects/chenshaya.png',
    highlights: [
      'עיצוב מודרני ונקי',
      'גלריית פרויקטים',
      'טופס יצירת קשר ישיר',
      'מותאם מלא למובייל',
    ],
    tags: ['אתר תדמית', 'בנייה והנדסה', 'B2B'],
  },
  {
    name: 'פז השקעות',
    url: 'https://www.paz-invest.co.il/',
    domain: 'paz-invest.co.il',
    tagline: 'אתר לחברת מימון פיננסי',
    description:
      'אתר לחברה ותיקה (30+ שנה) המתמחה בהלוואות חוץ בנקאיות, ניכיון שיקים ומימון פרויקטים בנדל"ן. דגש על אמינות, נגישות וקריאה לפעולה ברורה.',
    image: '/images/projects/paz-invest.png',
    highlights: [
      'דפי שירותים מפורטים',
      'כפתורי CTA חזקים',
      'אופטימיזציה ל-SEO',
      'טפסי בקשת הלוואה',
    ],
    tags: ['אתר תדמית', 'פיננסים', 'לידים'],
  },
];

export default function ProjectsSection() {
  return (
    <section className="py-6 bg-white">
      <Container>
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 mb-2 rounded-full bg-yellow-50 border border-yellow-200 text-gray-900 text-[10px] font-medium">
            <span className="w-1 h-1 bg-yellow-400 rounded-full"></span>
            <span>פרויקטים אמיתיים שעלו לאוויר</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black mb-1 text-gray-900">
            לקוחות שכבר שיתפו פעולה איתנו
          </h2>
          <p className="text-sm text-gray-600 max-w-2xl mx-auto">
            הצצה לחלק מהאתרים שבנינו - לחצו וצפו באתר החי
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
          {projects.map((project) => (
            <ProjectCard key={project.url} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-gray-50 rounded-xl overflow-hidden border-2 border-transparent hover:border-yellow-300 hover:shadow-xl transition-all duration-300"
    >
      {/* Browser-style screenshot frame */}
      <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        {/* Fake browser bar */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 border-b border-gray-200">
          <div className="flex gap-1">
            <span className="w-2 h-2 rounded-full bg-red-400"></span>
            <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
            <span className="w-2 h-2 rounded-full bg-green-400"></span>
          </div>
          <div className="flex-1 mx-2 px-2 py-0.5 bg-white rounded text-[9px] text-gray-500 truncate text-left" dir="ltr">
            {project.domain}
          </div>
        </div>

        {/* Screenshot */}
        <div className="relative aspect-[3/2] overflow-hidden">
          <Image
            src={project.image}
            alt={`תצוגת אתר ${project.name}`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            quality={85}
          />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-yellow-400 text-gray-900 text-xs font-bold rounded-lg shadow-lg">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              צפו באתר החי
            </span>
          </div>
        </div>
      </div>

      {/* Project info */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="text-base font-bold text-gray-900 group-hover:text-yellow-600 transition-colors">
            {project.name}
          </h3>
          <span className="text-[10px] text-gray-500 mt-1 whitespace-nowrap" dir="ltr">
            {project.domain}
          </span>
        </div>

        <p className="text-xs font-semibold text-yellow-600 mb-1.5">
          {project.tagline}
        </p>

        <p className="text-xs text-gray-600 mb-3 leading-relaxed">
          {project.description}
        </p>

        {/* Highlights */}
        <ul className="grid grid-cols-2 gap-x-2 gap-y-1 mb-3">
          {project.highlights.map((highlight) => (
            <li key={highlight} className="flex items-start gap-1 text-[10px] text-gray-700">
              <svg className="w-2.5 h-2.5 text-yellow-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-1.5 py-0.5 bg-yellow-50 text-yellow-700 text-[10px] rounded-full border border-yellow-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}
