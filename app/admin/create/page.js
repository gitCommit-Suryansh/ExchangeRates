'use client';
import React, { useState } from 'react';

const Create = () => {
  const [formData, setFormData] = useState({
    date: '',
    usd: '',
    aed: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Convert date string to ISO date format
      const formattedDate = new Date(formData.date);

      const res = await fetch('/api/rate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: formattedDate.toISOString(),
          usdt: parseFloat(formData.usd),
          aed: parseFloat(formData.aed),
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to add rate');
      }

      const data = await res.json();
      setMessage('✅ Rate added successfully!');
      setFormData({ date: '', usd: '', aed: '' });
    } catch (error) {
      setMessage(`❌ ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-800 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* Main Card */}
      <div className="relative w-full max-w-md">
        {/* Glassmorphism Card */}
        <div className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-6 text-center relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
            <div className="relative">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold">Add Exchange Rate</h1>
              <p className="text-white/80 text-sm mt-1">Update currency rates</p>
            </div>
          </div>

          {/* Form */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Date Input */}
              <div className="space-y-2">
                <label className="block text-white font-semibold text-sm uppercase tracking-wide">
                  📅 Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/90 border-2 border-transparent focus:border-white focus:bg-white transition-all duration-200 text-gray-800 shadow-lg backdrop-blur-sm"
                  />
                </div>
              </div>

              {/* USD Input */}
              <div className="space-y-2">
                <label className="block text-white font-semibold text-sm uppercase tracking-wide">
                  💵 USDT Rate
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    name="usd"
                    value={formData.usd}
                    onChange={handleChange}
                    required
                    placeholder="e.g., 91.20"
                    className="w-full px-4 py-3 rounded-xl bg-white/90 border-2 border-transparent focus:border-white focus:bg-white transition-all duration-200 text-gray-800 shadow-lg backdrop-blur-sm placeholder-gray-500"
                  />
                  <div className="absolute right-3 top-3 text-gray-400 font-semibold">₹</div>
                </div>
              </div>

              {/* AED Input */}
              <div className="space-y-2">
                <label className="block text-white font-semibold text-sm uppercase tracking-wide">
                  🏛️ AED Rate
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    name="aed"
                    value={formData.aed}
                    onChange={handleChange}
                    required
                    placeholder="e.g., 24.55"
                    className="w-full px-4 py-3 rounded-xl bg-white/90 border-2 border-transparent focus:border-white focus:bg-white transition-all duration-200 text-gray-800 shadow-lg backdrop-blur-sm placeholder-gray-500"
                  />
                  <div className="absolute right-3 top-3 text-gray-400 font-semibold">₹</div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 px-6 rounded-xl font-bold text-white text-lg transition-all duration-300 transform ${
                  loading
                    ? 'bg-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 hover:shadow-xl active:scale-95'
                } shadow-lg`}
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Submitting...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span>Add Rate</span>
                  </div>
                )}
              </button>

              {/* Message Display */}
              {message && (
                <div className={`p-4 rounded-xl text-center font-semibold ${
                  message.includes('✅') 
                    ? 'bg-green-500/20 border border-green-400/30 text-green-100' 
                    : 'bg-red-500/20 border border-red-400/30 text-red-100'
                } backdrop-blur-sm animate-pulse`}>
                  {message}
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-20 blur-xl animate-pulse"></div>
        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full opacity-20 blur-xl animate-pulse delay-1000"></div>
      </div>
    </div>
  );
};

export default Create;