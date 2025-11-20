import Reviews from '@/components/Reviews'

export const metadata = {
  title: 'ביקורות לקוחות | Pixelia',
  description: 'קרא ביקורות לקוחות והוסף את הביקורת שלך - אתרים מקצועיים מ-Pixelia'
}

export default function ReviewsPage() {
  return (
    <main className="min-h-screen">
      <Reviews />
    </main>
  )
}
