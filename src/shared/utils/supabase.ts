import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dorizihsmvfxhdbnazxo.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_dn3uJbuUOqm8DOwSzWaNMg_-AnRzW3p';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
