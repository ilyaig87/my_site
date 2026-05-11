'use client';

import { useEffect, useState } from 'react';

interface AnalyticsStats {
  visitors24h: number;
  activeUsers: number;
  pageviews24h: number;
}

export default function VisitorCounter() {
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const checkAdminStatus = async () => {
    try {
      const response = await fetch('/api/admin/auth');
      setIsAdmin(response.ok);
    } catch {
      setIsAdmin(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/analytics/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching visitor stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAdminStatus();
    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!isAdmin || isLoading || !stats || stats.visitors24h === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-6 z-40 lg-surface lg-shallow squircle-sm px-4 py-2 flex items-center gap-3 text-sm">
      <div className="relative z-10 flex items-center gap-2">
        <svg className="w-4 h-4 text-[var(--accent-cool)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <span className="font-bold text-[var(--text-strong)]">{stats.visitors24h}</span>
        <span className="text-[var(--text-muted)] text-xs">ב-24 שעות</span>
      </div>

      {stats.activeUsers > 0 && (
        <>
          <div className="w-px h-5 bg-[var(--glass-border-dim)] relative z-10" />
          <div className="relative z-10 flex items-center gap-2">
            <span className="flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
            </span>
            <span className="font-bold text-[var(--text-strong)]">{stats.activeUsers}</span>
            <span className="text-[var(--text-muted)] text-xs">פעילים</span>
          </div>
        </>
      )}
    </div>
  );
}
