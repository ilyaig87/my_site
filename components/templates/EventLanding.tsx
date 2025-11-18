import { Template } from '@/types';
import Button from '@/components/ui/Button';

export default function EventLanding({ template }: { template: Template }) {
  return (
    <div style={{ backgroundColor: template.colors.background }}>
      <section className="relative py-56 text-center overflow-hidden" style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <div className="absolute inset-0" style={{ backgroundColor: `${template.colors.primary}DD` }}></div>
        <div className="relative max-w-4xl mx-auto px-4 z-10 text-white">
          <div className="text-6xl font-bold mb-6 drop-shadow-2xl">🎯</div>
          <h1 className="text-6xl font-bold mb-6 drop-shadow-2xl">הכנס המשתלם של 2024</h1>
          <p className="text-2xl mb-8 drop-shadow">15-16 במרץ | תל אביב</p>
          <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
            {['15', '24', '35', '12'].map((num, idx) => (
              <div key={idx} className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
                <div className="text-4xl font-bold">{num}</div>
                <div className="text-sm">{['ימים', 'שעות', 'דקות', 'שניות'][idx]}</div>
              </div>
            ))}
          </div>
          <Button href="/register" size="lg">
            הרשמה עכשיו - 50% הנחה!
          </Button>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-16" style={{ color: template.colors.primary }}>המרצים שלנו</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((idx) => (
              <div key={idx} className="text-center">
                <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">שם המרצה</h3>
                <p className="text-gray-600">מומחה בתחום</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20" style={{ backgroundColor: template.colors.secondary, color: 'white' }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-8">לא להחמיץ!</h2>
          <Button href="/register" size="lg">
            הרשמה לכנס
          </Button>
        </div>
      </section>
    </div>
  );
}
