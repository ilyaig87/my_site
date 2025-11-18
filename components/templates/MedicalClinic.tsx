import { Template } from '@/types';
import { medicalClinicImages } from '@/data/medical-clinic-images';
import TemplateFooter from './footers/TemplateFooter';

interface MedicalClinicProps {
  template: Template;
}

export default function MedicalClinic({ template }: MedicalClinicProps) {
  const { colors } = template;

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background, color: colors.text }}>
      {/* Hero Section */}
      <section className="relative py-48 px-6 overflow-hidden" style={{
        backgroundImage: `url(${medicalClinicImages.hero})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <div className="absolute inset-0" style={{ backgroundColor: `${colors.secondary}EE` }}></div>
        <div className="relative max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center z-10">
          <div>
            <h1 className="text-5xl font-bold mb-6 drop-shadow-lg" style={{ color: colors.primary }}>
              הבריאות שלכם היא השליחות שלנו
            </h1>
            <p className="text-xl mb-8 drop-shadow" style={{ color: colors.text }}>
              קליניקה רפואית מתקדמת עם צוות מומחים מנוסים ומסורים לטיפול האיכותי ביותר
            </p>
            <div className="flex gap-4 flex-wrap">
              <button
                className="px-8 py-4 rounded-lg font-semibold transition-all hover:scale-105 shadow-lg"
                style={{ backgroundColor: colors.primary, color: '#ffffff' }}
              >
                קביעת תור
              </button>
              <button
                className="px-8 py-4 rounded-lg font-semibold border-2 transition-all hover:scale-105 bg-white/10"
                style={{ borderColor: colors.primary, color: colors.primary }}
              >
                שירותים רפואיים
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12" style={{ color: colors.primary }}>
            השירותים הרפואיים שלנו
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {medicalClinicImages.services.map((service) => (
              <div
                key={service.id}
                className="group relative rounded-xl overflow-hidden transition-all hover:shadow-2xl cursor-pointer"
                style={{ backgroundColor: colors.secondary }}
              >
                {/* תמונת רקע */}
                <div className="relative h-48 overflow-hidden">
                  <div
                    className="absolute inset-0 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      backgroundImage: `url(${service.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 right-4 text-4xl bg-white/90 w-16 h-16 rounded-full flex items-center justify-center shadow-lg">
                    {service.icon}
                  </div>
                </div>

                {/* תוכן */}
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-3" style={{ color: colors.primary }}>
                    {service.title}
                  </h3>
                  <p className="opacity-80 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Medical Team Section */}
      <section className="py-16 px-6" style={{ backgroundColor: colors.secondary }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4" style={{ color: colors.primary }}>
            הצוות הרפואי שלנו
          </h2>
          <p className="text-center text-lg mb-12 opacity-80">
            מומחים מנוסים ומוסמכים שדואגים לבריאותכם
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {medicalClinicImages.team.map((doctor) => (
              <div key={doctor.id} className="text-center">
                <div
                  className="w-32 h-32 mx-auto rounded-full mb-4 overflow-hidden"
                  style={{
                    backgroundImage: `url(${doctor.url})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                ></div>
                <h3 className="font-bold text-lg mb-1" style={{ color: colors.primary }}>
                  {doctor.name}
                </h3>
                <p className="text-sm opacity-80">{doctor.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section - Clinic Interior */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4" style={{ color: colors.primary }}>
            המתקן שלנו
          </h2>
          <p className="text-center text-lg mb-12 opacity-80">
            קליניקה מודרנית ומתקדמת עם הציוד הטוב ביותר
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {medicalClinicImages.gallery.map((image) => (
              <div
                key={image.id}
                className="relative h-64 rounded-xl overflow-hidden group cursor-pointer"
              >
                <div
                  className="absolute inset-0 transition-transform group-hover:scale-110"
                  style={{
                    backgroundImage: `url(${image.url})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <p className="text-white font-semibold">{image.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6" style={{ backgroundColor: colors.primary }}>
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            קבעו תור עוד היום
          </h2>
          <p className="text-xl mb-8 opacity-90">
            הצוות שלנו זמין עבורכם. נשמח לעזור ולתת את השירות הטוב ביותר
          </p>
          <button
            className="px-10 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105"
            style={{ backgroundColor: '#ffffff', color: colors.primary }}
          >
            התקשרו עכשיו
          </button>
        </div>
      </section>

      {/* Footer */}
      <TemplateFooter template={template} variant="professional" />
    </div>
  );
}
