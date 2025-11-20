'use client'

import { useState, useEffect } from 'react'

export default function StatsSection() {
  const [currentVisitors, setCurrentVisitors] = useState(0)
  const [happyClients, setHappyClients] = useState(0)
  const [completedProjects, setCompletedProjects] = useState(0)
  const [avgRating, setAvgRating] = useState(0)

  // Simulate real-time visitor count (changes every 10-30 seconds)
  useEffect(() => {
    // Initial random number of visitors (15-35)
    setCurrentVisitors(Math.floor(Math.random() * 20) + 15)

    const interval = setInterval(() => {
      setCurrentVisitors(prev => {
        const change = Math.random() > 0.5 ? 1 : -1
        const newValue = prev + change
        // Keep between 10 and 40
        return Math.max(10, Math.min(40, newValue))
      })
    }, Math.random() * 20000 + 10000) // 10-30 seconds

    return () => clearInterval(interval)
  }, [])

  // Animated counters on mount
  useEffect(() => {
    const animateCounter = (
      setter: (value: number) => void,
      target: number,
      duration: number = 2000
    ) => {
      const start = 0
      const increment = target / (duration / 16) // 60fps
      let current = start

      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          setter(target)
          clearInterval(timer)
        } else {
          setter(Math.floor(current))
        }
      }, 16)

      return timer
    }

    const timers = [
      animateCounter(setHappyClients, 487, 2000),
      animateCounter(setCompletedProjects, 1234, 2500),
      animateCounter(setAvgRating, 4.9, 1500),
    ]

    return () => timers.forEach(clearInterval)
  }, [])

  const stats = [
    {
      label: 'מבקרים כרגע',
      value: currentVisitors,
      suffix: '',
      icon: '👥',
      live: true,
      color: 'from-green-500 to-emerald-600'
    },
    {
      label: 'לקוחות מרוצים',
      value: happyClients,
      suffix: '+',
      icon: '😊',
      color: 'from-yellow-500 to-orange-600'
    },
    {
      label: 'פרויקטים הושלמו',
      value: completedProjects.toLocaleString('he-IL'),
      suffix: '+',
      icon: '🚀',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      label: 'דירוג ממוצע',
      value: avgRating.toFixed(1),
      suffix: '/5 ⭐',
      icon: '⭐',
      color: 'from-purple-500 to-pink-600'
    }
  ]

  return (
    <section className="py-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-3">
          <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1">
            במספרים
          </h2>
          <p className="text-[10px] text-gray-600 dark:text-gray-300">
            הנתונים מדברים בעד עצמם
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative group"
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 dark:border-gray-700 hover:border-yellow-400 dark:hover:border-yellow-500 transform hover:scale-105">
                {/* Live indicator */}
                {stat.live && (
                  <div className="absolute top-1.5 right-1.5 flex items-center gap-0.5">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                    </span>
                    <span className="text-[8px] text-green-600 dark:text-green-400 font-medium">LIVE</span>
                  </div>
                )}

                {/* Icon */}
                <div className="text-lg mb-1 transform group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>

                {/* Value */}
                <div className={`text-xl md:text-2xl font-bold mb-0.5 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}{stat.suffix}
                </div>

                {/* Label */}
                <div className="text-[10px] md:text-xs text-gray-600 dark:text-gray-300 font-medium">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional trust line */}
        <div className="mt-3 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-[10px]">
            🎉 <strong>עדכון אחרון:</strong> פרויקט חדש הושלם לפני{' '}
            <span className="text-yellow-600 dark:text-yellow-400 font-semibold">2 שעות</span>
          </p>
        </div>
      </div>
    </section>
  )
}
