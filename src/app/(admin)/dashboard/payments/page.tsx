'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/shared/utils/supabase';
import { CreditCard, Save, Loader2, AlertCircle } from 'lucide-react';

export default function PaymentsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const [testKey, setTestKey] = useState('');
  const [liveKey, setLiveKey] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const { data } = await supabase.from('site_settings').select('*').limit(1).maybeSingle();
    if (data) {
      setIsLive(data.is_stripe_live);
      setTestKey(data.stripe_public_key_test || '');
      setLiveKey(data.stripe_public_key_live || '');
    }
    setLoading(false);
  };

  const saveSettings = async () => {
    setSaving(true);
    setMessage('');
    
    try {
      const { data: existing } = await supabase.from('site_settings').select('id').limit(1).maybeSingle();
      
      let error;
      if (existing) {
        const result = await supabase.from('site_settings').update({
          is_stripe_live: isLive,
          stripe_public_key_test: testKey,
          stripe_public_key_live: liveKey,
          updated_at: new Date()
        }).eq('id', existing.id);
        error = result.error;
      } else {
        const result = await supabase.from('site_settings').insert([{
          is_stripe_live: isLive,
          stripe_public_key_test: testKey,
          stripe_public_key_live: liveKey,
        }]);
        error = result.error;
      }
      
      if (error) throw error;
      
      setMessage('Settings saved securely!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err: any) {
      console.error(err);
      setMessage(`Error saving settings: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-[#987C6F]" size={32} /></div>;

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-black text-[#5D4E46]">Payment Settings</h2>
        <button 
          onClick={saveSettings}
          disabled={saving}
          className="flex items-center gap-2 bg-[#987C6F] text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-[#7d665b] transition-colors disabled:opacity-50"
        >
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          Save Settings
        </button>
      </div>

      {message && <div className="p-4 bg-[#AAB084]/20 text-[#6B724D] rounded-xl text-sm font-bold">{message}</div>}

      <div className="bg-white rounded-2xl shadow-sm border border-[#5D4E46]/10 p-8">
        <div className="flex items-center gap-4 border-b border-[#5D4E46]/10 pb-6 mb-6">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 flex items-center justify-center rounded-xl">
            <CreditCard size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#5D4E46]">Stripe & Klarna Integration</h3>
            <p className="text-sm text-[#5D4E46]/60">Manage your payment gateway credentials and environments.</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between bg-[#FDFBF7] p-4 rounded-xl border border-[#5D4E46]/10">
            <div>
              <h4 className="font-bold text-[#5D4E46]">Environment Mode</h4>
              <p className="text-xs text-[#5D4E46]/60">Toggle between testing and live payments.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={isLive} onChange={(e) => setIsLive(e.target.checked)} />
              <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-500"></div>
              <span className="ml-3 text-sm font-bold text-[#5D4E46]">{isLive ? 'LIVE' : 'SANDBOX'}</span>
            </label>
          </div>

          <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200 flex gap-3 text-yellow-800">
            <AlertCircle size={20} className="shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-bold mb-1">Security Notice: Secret Keys</p>
              <p>For security reasons, your Stripe <b>Secret Keys</b> are managed directly in the Supabase Edge Functions environment. You should only enter your <b>Public / Publishable Keys</b> here.</p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#5D4E46]/70 mb-2">Test Publishable Key (pk_test_...)</label>
            <input 
              type="text" 
              value={testKey} 
              onChange={(e) => setTestKey(e.target.value)} 
              className="w-full p-4 bg-[#FDFBF7] border border-[#5D4E46]/20 rounded-xl outline-none focus:border-[#987C6F] transition-colors font-mono text-sm" 
              placeholder="pk_test_..." 
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#5D4E46]/70 mb-2">Live Publishable Key (pk_live_...)</label>
            <input 
              type="text" 
              value={liveKey} 
              onChange={(e) => setLiveKey(e.target.value)} 
              className="w-full p-4 bg-[#FDFBF7] border border-[#5D4E46]/20 rounded-xl outline-none focus:border-[#987C6F] transition-colors font-mono text-sm" 
              placeholder="pk_live_..." 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
