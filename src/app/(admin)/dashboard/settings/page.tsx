'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/shared/utils/supabase';
import { Loader2, Save, BarChart, Search } from 'lucide-react';

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  
  const [settings, setSettings] = useState({
    ga_id: '',
    gsc_id: ''
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('site_settings').select('*');
    if (!error && data) {
      const ga = data.find(row => row.key === 'google_analytics_id')?.value || '';
      const gsc = data.find(row => row.key === 'google_search_console_id')?.value || '';
      setSettings({ ga_id: ga, gsc_id: gsc });
    }
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    
    try {
      // Upsert Google Analytics ID
      await supabase.from('site_settings').upsert({ key: 'google_analytics_id', value: settings.ga_id }, { onConflict: 'key' });
      // Upsert Google Search Console ID
      await supabase.from('site_settings').upsert({ key: 'google_search_console_id', value: settings.gsc_id }, { onConflict: 'key' });
      
      setMessage({ type: 'success', text: 'Settings saved successfully. The tracking codes are now active.' });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to save settings.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-[#987C6F]" size={32} /></div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-black text-[#5D4E46] mb-8">Site Settings</h2>

      <form onSubmit={handleSave} className="space-y-8">
        {message && (
          <div className={`p-4 rounded-xl text-sm font-medium border ${message.type === 'success' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
            {message.text}
          </div>
        )}

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#5D4E46]/5 space-y-6">
          <div className="flex items-center gap-2 border-b border-[#5D4E46]/10 pb-4 mb-6">
            <BarChart className="text-[#987C6F]" size={24} />
            <h3 className="text-xl font-bold text-[#5D4E46]">Google Analytics</h3>
          </div>
          
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#5D4E46]/70 mb-2">Measurement ID (G-XXXXXXXXXX)</label>
            <input 
              type="text" 
              value={settings.ga_id} 
              onChange={(e) => setSettings({...settings, ga_id: e.target.value})} 
              className="w-full p-4 bg-[#FDFBF7] border border-[#5D4E46]/20 rounded-xl outline-none focus:border-[#987C6F] transition-colors font-mono" 
              placeholder="G-..." 
            />
            <p className="text-xs text-gray-400 mt-2">Enter your Google Analytics 4 Measurement ID to track visitors on your live site.</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#5D4E46]/5 space-y-6">
          <div className="flex items-center gap-2 border-b border-[#5D4E46]/10 pb-4 mb-6">
            <Search className="text-[#987C6F]" size={24} />
            <h3 className="text-xl font-bold text-[#5D4E46]">Google Search Console</h3>
          </div>
          
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#5D4E46]/70 mb-2">Verification Code</label>
            <input 
              type="text" 
              value={settings.gsc_id} 
              onChange={(e) => setSettings({...settings, gsc_id: e.target.value})} 
              className="w-full p-4 bg-[#FDFBF7] border border-[#5D4E46]/20 rounded-xl outline-none focus:border-[#987C6F] transition-colors font-mono" 
              placeholder="Enter HTML tag verification content..." 
            />
            <p className="text-xs text-gray-400 mt-2">Paste the content value from the GSC HTML verification tag to verify domain ownership.</p>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button type="submit" disabled={saving} className="px-8 py-4 bg-[#5D4E46] text-white font-black uppercase tracking-wider rounded-xl hover:bg-[#3A3532] transition-colors disabled:opacity-70 flex items-center gap-3 shadow-lg shadow-[#5D4E46]/20">
            {saving && <Loader2 size={20} className="animate-spin" />}
            <Save size={20} /> Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}
