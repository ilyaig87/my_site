import Container from '@/components/ui/Container';

export default function ServicesSection() {
  const services = [
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'בניית דף נחיתה או אתר מלא',
      description: 'דף נחיתה בודד למבצע או קמפיין, או אתר מלא עד 5+ דפים לפי הצורך. עיצוב מקצועי והתאמה מושלמת למובייל.'
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
        </svg>
      ),
      title: 'בחירת תבנית או עיצוב אישי',
      description: 'תבחרו תבנית מוכנה מהגלריה שלנו והתאמה לצבעים ותוכן שלכם, או עיצוב מותאם אישית מאפס לפי המיתוג שלכם.'
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      ),
      title: 'העלאה לדומיין',
      description: 'אני מעלה את האתר שלכם לדומיין שרכשתם, או עוזר לכם לרכוש דומיין חדש ומעלה אותו בשבילכם. האתר יהיה באוויר ופעיל.'
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      ),
      title: 'תוספת DB (אופציונלי)',
      description: 'צריכים טפסים עם שמירת מידע, מערכת הזמנות, או ניהול תוכן? אפשר להוסיף מסד נתונים בתוספת תשלום.'
    }
  ];

  return (
    <section className="py-6 bg-white">
      <Container>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-4">
            <h2 className="text-xl md:text-2xl font-black mb-2 text-gray-900">
              מה תקבלו בחבילה
            </h2>
            <p className="text-sm text-gray-600 max-w-3xl mx-auto">
              פתרון מלא ומקצועי לבניית אתר התדמית של העסק שלך
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 gap-3">
            {services.map((service, index) => (
              <div
                key={index}
                className="group bg-gray-50 rounded-lg p-3 hover:bg-yellow-50 transition-all duration-300 border-2 border-transparent hover:border-yellow-200 hover:shadow-xl"
              >
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-8 h-8 mb-2 rounded-lg bg-yellow-100 text-yellow-600 group-hover:bg-yellow-200 transition-colors">
                  <div className="scale-75">{service.icon}</div>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold mb-1 text-gray-900">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
