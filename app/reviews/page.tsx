import Reviews from '@/components/Reviews'

export const metadata = {
  title: 'ביקורות לקוחות | SiteCraft',
  description: 'קרא ביקורות לקוחות והוסף את הביקורת שלך'
}

export default function ReviewsPage() {
  return (
    <main className="min-h-screen">
      <Reviews />
    </main>
  )
}
