'use client'

import { useEffect, useState } from 'react'

interface ContactSubmission {
  id: string
  name: string
  email: string
  phone: string | null
  message: string
  source_page: string | null
  status: string
  created_at: string
}

interface QuoteRequest {
  id: string
  customer_name: string
  customer_email: string
  customer_phone: string | null
  website_type: string
  calculated_price: number
  status: string
  created_at: string
}

export default function LeadsView() {
  const [contacts, setContacts] = useState<ContactSubmission[]>([])
  const [quotes, setQuotes] = useState<QuoteRequest[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'contacts' | 'quotes'>('contacts')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [contactsRes, quotesRes] = await Promise.all([
          fetch('/api/contact'),
          fetch('/api/quote')
        ])

        if (contactsRes.ok) {
          const data = await contactsRes.json()
          setContacts(data.submissions || [])
        }

        if (quotesRes.ok) {
          const data = await quotesRes.json()
          setQuotes(data.quotes || [])
        }
      } catch (error) {
        console.error('Error fetching leads:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const totalLeads = contacts.length + quotes.length
  const newLeads = [...contacts, ...quotes].filter(
    (l: any) => l.status === 'new' || l.status === 'pending'
  ).length

  if (isLoading) {
    return <div className="text-center py-12 text-gray-600">טוען לידים...</div>
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-lg">
          <p className="text-sm text-gray-600 font-medium mb-2">סה"כ לידים</p>
          <p className="text-4xl font-black text-gray-900">{totalLeads}</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border-2 border-yellow-200 shadow-lg bg-yellow-50">
          <p className="text-sm text-gray-600 font-medium mb-2">לידים חדשים</p>
          <p className="text-4xl font-black text-yellow-700">{newLeads}</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border-2 border-blue-200 shadow-lg bg-blue-50">
          <p className="text-sm text-gray-600 font-medium mb-2">בקשות למחיר</p>
          <p className="text-4xl font-black text-blue-700">{quotes.length}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl p-4 border-2 border-gray-200">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('contacts')}
            className={`px-6 py-3 rounded-xl font-bold transition-colors ${
              activeTab === 'contacts'
                ? 'bg-yellow-400 text-gray-900'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            פניות ({contacts.length})
          </button>
          <button
            onClick={() => setActiveTab('quotes')}
            className={`px-6 py-3 rounded-xl font-bold transition-colors ${
              activeTab === 'quotes'
                ? 'bg-yellow-400 text-gray-900'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            בקשות מחיר ({quotes.length})
          </button>
        </div>
      </div>

      {/* Contact Submissions */}
      {activeTab === 'contacts' && (
        <div className="space-y-4">
          {contacts.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 border-2 border-gray-200 text-center text-gray-600">
              אין פניות
            </div>
          ) : (
            contacts.map((contact) => (
              <div key={contact.id} className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{contact.name}</h3>
                    <p className="text-gray-600">{contact.email}</p>
                    {contact.phone && <p className="text-gray-600">{contact.phone}</p>}
                  </div>
                  <div className="text-left">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                        contact.status === 'new'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {contact.status === 'new' ? 'חדש' : contact.status}
                    </span>
                    <p className="text-sm text-gray-500 mt-2">
                      {new Date(contact.created_at).toLocaleDateString('he-IL')}
                    </p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <p className="text-gray-900 whitespace-pre-wrap">{contact.message}</p>
                </div>
                {contact.source_page && (
                  <p className="text-sm text-gray-500">מקור: {contact.source_page}</p>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* Quote Requests */}
      {activeTab === 'quotes' && (
        <div className="space-y-4">
          {quotes.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 border-2 border-gray-200 text-center text-gray-600">
              אין בקשות מחיר
            </div>
          ) : (
            quotes.map((quote) => (
              <div key={quote.id} className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{quote.customer_name}</h3>
                    <p className="text-gray-600">{quote.customer_email}</p>
                    {quote.customer_phone && <p className="text-gray-600">{quote.customer_phone}</p>}
                  </div>
                  <div className="text-left">
                    <div className="text-3xl font-black text-yellow-600 mb-2">
                      ₪{quote.calculated_price.toLocaleString()}
                    </div>
                    <p className="text-sm text-gray-500">
                      {new Date(quote.created_at).toLocaleDateString('he-IL')}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 rounded-xl p-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">סוג אתר</p>
                    <p className="font-bold text-gray-900">{quote.website_type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">סטטוס</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                      quote.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {quote.status === 'pending' ? 'ממתין' : quote.status}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
