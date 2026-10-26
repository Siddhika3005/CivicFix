import React from 'react';
import Link from 'next/link';

const MOCK_ISSUES = [
  { id: 'CF-1024', title: 'Severe Pothole', location: '27.4924° N, 77.6737° E', status: 'CRITICAL', date: 'Oct 26, 2026', img: 'bg-zinc-800' },
  { id: 'CF-1025', title: 'Fallen Streetlight', location: 'University Main Gate', status: 'PENDING', date: 'Oct 25, 2026', img: 'bg-zinc-700' },
  { id: 'CF-1026', title: 'Water Pipe Leak', location: 'Sector 4, Block B', status: 'RESOLVED', date: 'Oct 22, 2026', img: 'bg-zinc-900' },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#fcfcfc] text-black font-sans selection:bg-black selection:text-white">
      {/* Top Navigation */}
      <nav className="flex justify-between items-center px-8 py-6 border-b border-black">
        <h1 className="text-2xl font-serif tracking-tight">CivicFix.</h1>
        <div className="flex gap-8 text-sm tracking-widest uppercase">
          <Link href="/report" className="hover:opacity-60 transition-opacity">Report</Link>
          <Link href="/map" className="hover:opacity-60 transition-opacity">Map</Link>
          <Link href="/dashboard" className="border-b border-black pb-1">Dashboard</Link>
          <Link href="/profile" className="hover:opacity-60 transition-opacity">Profile</Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-8 py-16">
        {/* Header & Metrics */}
        <header className="mb-16">
          <h2 className="text-5xl font-serif mb-12">Authority Overview</h2>
          <div className="grid grid-cols-3 border-t border-b border-black divide-x divide-black">
            <div className="p-6">
              <p className="text-xs uppercase tracking-widest text-zinc-500 mb-2">Total Issues</p>
              <p className="text-4xl font-serif">1,284</p>
            </div>
            <div className="p-6">
              <p className="text-xs uppercase tracking-widest text-zinc-500 mb-2">Pending</p>
              <p className="text-4xl font-serif">327</p>
            </div>
            <div className="p-6 bg-black text-white">
              <p className="text-xs uppercase tracking-widest text-zinc-400 mb-2">Resolved</p>
              <p className="text-4xl font-serif">775</p>
            </div>
          </div>
        </header>

        {/* Issue Grid */}
        <section>
          <div className="flex justify-between items-end mb-8 border-b border-black pb-4">
            <h3 className="text-2xl font-serif">Active Reports</h3>
            <span className="text-xs uppercase tracking-widest">Filter / Sort</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MOCK_ISSUES.map((issue) => (
              <article key={issue.id} className="group border border-black p-4 flex flex-col justify-between hover:bg-zinc-100 transition-colors">
                <div>
                  {/* Cinematic Image Placeholder */}
                  <div className={`w-full h-48 ${issue.img} mb-6 relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent mix-blend-multiply"></div>
                  </div>
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-xl font-serif">{issue.title}</h4>
                    <span className={`text-[10px] px-2 py-1 uppercase tracking-wider border border-black ${issue.status === 'CRITICAL' ? 'bg-red-900 text-white border-red-900' : 'bg-transparent text-black'}`}>
                      {issue.status}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 mb-1">{issue.location}</p>
                  <p className="text-xs text-zinc-400">{issue.id} • {issue.date}</p>
                </div>
                <button className="mt-8 w-full border border-black py-3 text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
                  View Details
                </button>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}