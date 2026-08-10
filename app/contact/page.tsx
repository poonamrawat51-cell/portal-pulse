import React from 'react';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-xl w-full bg-slate-900 border border-slate-800 rounded-xl p-8 shadow-xl">
        <h1 className="text-3xl font-bold mb-4 text-center">Contact Us</h1>
        <p className="text-slate-400 text-center mb-8">
          Have questions or need support with Portal Pulse? Reach out to our team below.
        </p>

        <div className="space-y-6">
          <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Support Email
            </h2>
            <a 
              href="mailto:portalpulse.support@gmail.com" 
              className="text-lg text-blue-400 hover:underline font-medium"
            >
              portalpulse.support@gmail.com
            </a>
          </div>

          <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Response Time
            </h2>
            <p className="text-slate-300">
              We respond to all support requests within 24 business hours.
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a 
            href="/" 
            className="text-sm text-slate-400 hover:text-white transition-colors"
          >
            ← Back to Homepage
          </a>
        </div>
      </div>
    </main>
  );
}
