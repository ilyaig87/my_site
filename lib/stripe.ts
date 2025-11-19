import Stripe from 'stripe'

// Initialize Stripe - will work in test mode until you add real keys
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2024-12-18.acacia',
})

export const formatPrice = (amount: number, currency: string = 'ILS') => {
  return new Intl.NumberFormat('he-IL', {
    style: 'currency',
    currency: currency,
  }).format(amount)
}
